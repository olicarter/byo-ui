import { gql } from '@apollo/client';

import { User } from '../../fragments';

export const GET_ORDER_ITEMS = gql`
  query GetUnpaidOrderItems($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      ...User
    }
  }
  ${User}
`;
