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
    // managing creating users / logging them in
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

    // users managing their stocks
    buyStock: async (parent, args, context) => {
      if (context.user) {
        return "You are in!";
      }

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
      // code 404 is just a returned string; can be anything
      throw new GraphQLError('No stock found!', {
        extensions: {
          code: '404',
        },
      });
    }
  }
}

module.exports = resolvers;
