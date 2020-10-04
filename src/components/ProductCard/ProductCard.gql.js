import { gql } from '@apollo/client';

import { User } from '../../fragments';

export const GET_USER = gql`
  query ProductCardGetUserOrders($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      ...User
    }
  }
  ${User}
`;
