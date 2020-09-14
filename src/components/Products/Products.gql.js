import { gql } from '@apollo/client';

import { Orders, Product } from '../../fragments';

export const GET_ALL_PRODUCTS_QUERY = gql`
  query GetAllProducts {
    allProducts {
      ...Product
    }
  }
  ${Product}
`;

export const GET_AUTH_DATA = gql`
  query GetUserUnpaidOrder($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      id
      ...Orders
    }
  }
  ${Orders}
`;
