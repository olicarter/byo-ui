import { gql } from '@apollo/client';

import { User } from '../../fragments';

export const GET_UNPAID_ORDER_ITEMS_COUNT = gql`
  query BasketIconGetUserOrders($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      ...User
    }
  }
  ${User}
`;
