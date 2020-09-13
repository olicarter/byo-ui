import { gql } from '@apollo/client';

import { OrderItems } from '../../fragments';

export const GET_ALL_PRODUCTS_QUERY = gql`
  query GetAllProducts {
    allProducts {
      id
      increments
      name
      price
      slug
      tags {
        id
        slug
      }
      unit
    }
  }
`;

export const GET_AUTH_DATA = gql`
  query GetUserUnpaidOrder($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      id
      orders {
        id
        paid
        ...OrderItems
      }
    }
  }
  ${OrderItems}
`;
