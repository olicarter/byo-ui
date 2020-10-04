import { gql } from '@apollo/client';

import { User } from '../../fragments';

export const GET_ORDER_ITEMS_QUERY = gql`
  query GetUnpaidOrderItems($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      ...User
    }
  }
  ${User}
`;
