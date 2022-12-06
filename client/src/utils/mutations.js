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
  mutation buyStock($stockId: ID!, $qty: Int!) {
    buyStock(stockId: $stockId, qty: $qty) {
      _id
      money
      portfolio {
        _id
        quantity
        stockId
    }
  }
}
`;

export const SELL_STOCK = gql`
mutation SellStock($stockId: ID!, $qty: Int!) {
  sellStock(stockId: $stockId, qty: $qty) {
    _id
    money
    username
    portfolio {
      _id
      quantity
      stockId
    }
  }
}
`;

