import { gql } from '@apollo/client';

export const GET_UNPAID_ORDER_ITEMS_COUNT = gql`
  query($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      id
      orders(where: { paid_not: true }) {
        id
        _orderItemsMeta {
          count
        }
      }
    }
  }
`;
