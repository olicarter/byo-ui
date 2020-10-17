import { gql } from '@apollo/client';

import { User } from '../../fragments';

export const GET_USER = gql`
  query SubmittedUnpaidOrderGetUser($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      ...User
    }
  }
  ${User}
`;
