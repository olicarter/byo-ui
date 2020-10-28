import { gql } from '@apollo/client';

import { User } from '../../fragments';

export const GET_AUTHENTICATED_USER = gql`
  query UserDetailsFormGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;

export const UPDATE_USER_BY_NETLIFY_ID = gql`
  mutation UpdateUserInformation(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    updateUser(
      id: $id
      data: { firstName: $firstName, lastName: $lastName, email: $email }
    ) {
      ...User
    }
  }
  ${User}
`;
