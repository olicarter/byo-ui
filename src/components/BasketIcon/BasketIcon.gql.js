import { gql } from '@apollo/client';

export const GET_UNPAID_ORDER_ITEMS_COUNT = gql`
  query BasketIconGetUserOrders($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      id
      orders {
        id
        orderItems {
          id
        }
      }
    }
  }
`;
