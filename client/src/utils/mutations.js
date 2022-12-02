import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token 
      user {
        _id
        username
      }
    }  
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const BUY_STOCK = gql`
  mutation buyStock($id: ID!) {
    buyStock(stockId: $id) {
      _id
      stockName
      stockDescription
      stockPrice
    }
  }
`;

export const SELL_STOCK = gql`
  mutation sellStock($id: ID!) {
    sellStock(stockId: $id) {
      _id
    }
  }
`;