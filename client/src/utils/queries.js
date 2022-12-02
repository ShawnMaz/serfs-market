import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username){
      _id
      username
      email
      portfolio {
        _id
        stockId
        quantity
      }
    }
  }
`;

export const QUERY_STOCK = gql`
  query_stock($id: ID!) {
    stock(_id: $id){
      _id
      stockName
      stockDescription
      stockPrice
    }
  }
`;

export const QUERY_STOCKS = gql`
  stock(_id: $id){
      _id
      stockName
      stockDescription
      stockPrice
    }
  }
`;


