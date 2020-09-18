import { gql } from '@apollo/client';

import { Orders } from '../../fragments';

export const GET_ORDER_ITEMS_QUERY = gql`
  query GetUnpaidOrderItems($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      id
      ...Orders
    }
  }
  ${Orders}
`;
