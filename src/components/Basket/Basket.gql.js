import { gql } from '@apollo/client';

export const GET_ORDER_ITEMS_QUERY = gql`
  query($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      id
      orders(where: { paid_not: true }) {
        id
        orderItems {
          id
          product {
            id
            increments
            name
            unit
          }
          quantity
        }
      }
    }
  }
`;
