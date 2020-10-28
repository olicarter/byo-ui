import { gql } from '@apollo/client';

import { User } from '../../fragments';

export const GET_USER = gql`
  query SubmittedUnpaidOrderGetUsersByAuth0Id($auth0Id: String!) {
    allUsers(where: { auth0Id: $auth0Id }) {
      ...User
    }
  }
  ${User}
`;
