import { gql } from '@apollo/client';

import { User } from '../../fragments';

export const GET_USERS_BY_AUTH0_ID = gql`
  query ProductCardGetUsersByAuth0Id($auth0Id: String!) {
    allUsers(where: { auth0Id: $auth0Id }) {
      ...User
    }
  }
  ${User}
`;
