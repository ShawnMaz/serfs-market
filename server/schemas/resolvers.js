const { User, Stock, StockEntry } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { GraphQLError } = require('graphql'); // for custom error handling
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // querying users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('portfolio');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('portfolio');
    },

    // querying stocks
    stocks: async () => {
      return Stock.find()
        .select('-__v');
    },
    stock: async (parent, { stockId }) => {
      return Stock.findOne({ _id: stockId })
        .select('-__v');
    }
  },

  Mutation: {
    // managing creating + deleting users / logging them in
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials!');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials!');
      }

      const token = signToken(user);
      return { token, user };
    },
    removeUser: async (parent, { username, password }, context) => {
      if (context.user) {
        const user = await User.findOne({ username: username });
        if (!user) {
          throw new AuthenticationError('Incorrect credentials!');
        }

        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials!');
        }

        // now delete this user if auth passed
        const deletedUser = await User.findOneAndDelete({ username: username }, { new: true });
        return deletedUser;
      }

      // throw auth error if not logged in to delete
      throw new AuthenticationError('Please log in!');
    },

    // users managing their stocks
    buyStock: async (parent, { stockId, qty }, context) => {
      if (context.user) {
        // does user have enough money for this transaction?
        const user = await User.findOne({ _id: context.user._id });
        const stock = await Stock.findOne({ _id: stockId });

        // throw error if user or stock cannot be found
        if (!user || !stock) {
          throw new GraphQLError('User or stock not found!', {
            extensions: {
              code: '404',
            },
          }); 
        }

        // calculate amount to be spent in this transaction
        const toSpend = stock.stockPrice * qty;
        const spent = user.money - toSpend;

        // throw error if user does not have enough money
        if (toSpend > user.money) {
          throw new GraphQLError('User does not have enough cash!', {
            extensions: {
              code: 'BROKE',
            },
          });
        }

        // does the user already have this stock entry?
        const userStocks = user.portfolio;
        let stockEntry;
        let newStockEntry;
        userStocks.forEach(entry => {
          if (entry.stockId.equals(stockId)) {
            stockEntry = entry;
          }
        });

        if (!stockEntry) {
          // define our new stock entry if one does not exist already
          newStockEntry = {
            stockId: stockId,
            quantity: qty
          }
          // add it to our user's portfolio and subtract from their cash
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { portfolio: newStockEntry }, money: spent },
            { new: true }
          ).populate('portfolio');
          return updatedUser;
        } else {
          // otherwise update our existing entry
          stockEntry.quantity = stockEntry.quantity += qty;
          // subtract from our user's cash
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $set: {
                portfolio: userStocks
              },
              money: spent
            },
            { new: true }
          ).populate('portfolio');
          return updatedUser;
        }
      }

      // else throw auth error
      throw new AuthenticationError('Please log in!');
    },
    sellStock: async (parent, { stockId, qty }, context) => {
      if (context.user) {
        // get our stock and user
        const user = await User.findOne({ _id: context.user._id });
        const stock = await Stock.findOne({ _id: stockId });

        // throw error if user or stock cannot be found
        if (!user || !stock) {
          throw new GraphQLError('User or stock not found!', {
            extensions: {
              code: '404',
            },
          }); 
        }

        // does the user have this stock entry?
        const userStocks = user.portfolio;
        let stockEntry;
        userStocks.forEach(entry => {
          if (entry.stockId.equals(stockId)) {
            stockEntry = entry;
          }
        });

        // throw error if they do not
        if (!stockEntry || qty > stockEntry.quantity) {
          throw new GraphQLError('User does not own that many stocks!', {
            extensions: {
              code: 'NO_INVESTMENT'
            },
          });
        } else { // if all is good, progress to calculation
          // calculate amount to be earned in this transaction
          const toEarn = stock.stockPrice * qty;
          const totalAmount = user.money += toEarn;

          // update our entry
          stockEntry.quantity = stockEntry.quantity -= qty;
          // delete entry if quantity is 0 or less (shouldn't be less though)
          if (stockEntry.quantity < 1) {
            const index = userStocks.indexOf(stockEntry);
            userStocks.splice(index, 1);
          }

          // add to our user's cash
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            {
              $set: {
                portfolio: userStocks
              },
              money: totalAmount
            },
            { new: true }
          ).populate('portfolio');
          return updatedUser;
        }
      }

      // else throw auth error
      throw new AuthenticationError('Please log in!');
    },

    // adding / removing stocks from the server
    // should add admin authentication to these features . . . 
    addStock: async (parent, args) => {
      const stock = await Stock.create(args);
      return stock;
    },
    removeStock: async (parent, { stockId }) => {
      const deletedStock = await Stock.findOneAndDelete(
        { _id: stockId },
        { new: true }
      );
      
      if (deletedStock) {
        return deletedStock
      }

      // throw a custom GraphQL error if the stock cannot be found
      // code: 404 is just a returned string; can be anything
      throw new GraphQLError('No stock found!', {
        extensions: {
          code: '404',
        },
      });
    }
  }
}

module.exports = resolvers;
