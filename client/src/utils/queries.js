import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username){
      _id
      username
      email
      money
      portfolio {
        _id
        stockId
        quantity
      }
    }
  }
`;

export const QUERY_STOCK = gql`
  query stock($id: ID!) {
    stock(_id: $id){
      _id
      stockName
      stockDescription
      stockPrice
    }
  }
`;

export const QUERY_STOCKS = gql`
  {
  stocks {
      _id
      stockName
      stockDescription
      stockPrice
      stockCategory
      multiplier
    }
  }
`;



