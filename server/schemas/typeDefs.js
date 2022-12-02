// import gql
const { gql } = require('apollo-server-express');

// define typeDefs
const typeDefs = gql`
  # make our type definitions 
  type User {
    _id: ID
    username: String
    email: String
    money: Float
    portfolio: [StockEntry]
  }

  type StockEntry {
    _id: ID
    stockId: ID
    quantity: Int
  }

  type Stock {
    _id: ID
    stockName: String
    stockDescription: String
    stockPrice: Float
  }

  type Query {
    users: [User]
    user(username: String!): User
    stocks: [Stock]
    stock(stockId: ID!): Stock
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    # managing user accounts
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeUser(username: String!, password: String!): User
    # users buying / selling stocks with Stock Entries
    buyStock(stockId: ID!, qty: Int!): User
    sellStock(stockId: ID!, qty: Int!): User
    # for managing which stocks are stored on the server
    addStock(stockName: String!, stockDescription: String!, stockPrice: Float!): Stock
    removeStock(stockId: ID!): Stock
    updateStock(stockId: ID!, newPrice: Float!): Stock
  }
`;

module.exports = typeDefs;
