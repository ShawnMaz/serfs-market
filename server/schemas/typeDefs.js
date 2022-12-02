// import gql
const { gql } = require('apollo-server-express');

// define typeDefs
const typeDefs = gql`
  # make our type definitions 
  type User {
    _id: ID
    username: String
    email: String
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
    stock(_id: ID!): Stock
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    buyStock(stockId: ID!, qty: Int!): User
    sellStock(stockId: ID!, qty: Int!): User
  }
`;