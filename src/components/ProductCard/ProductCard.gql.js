import { gql } from '@apollo/client';

import { Orders } from '../../fragments';

export const GET_USER = gql`
  query ProductCardGetUserOrders($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      id
      ...Orders
    }
  }
  ${Orders}
`;
