import { gql } from '@apollo/client';

import { User } from '@fragments';

export const GET_AUTHENTICATED_USER = gql`
  query AuthContextGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;

export const AUTHENTICATE_USER = gql`
  mutation AuthContextAuthenticateUser($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      token
      item {
        ...User
      }
    }
  }
  ${User}
`;

export const UNAUTHENTICATE_USER = gql`
  mutation AuthContextUnauthenticateUser {
    unauthenticateUser {
      success
    }
  }
`;

export const CREATE_USER = gql`
  mutation AuthContextCreateUser(
    $email: String!
    $name: String!
    $password: String!
    $phone: String!
  ) {
    createUser(
      data: { email: $email, name: $name, password: $password, phone: $phone }
    ) {
      ...User
    }
  }
  ${User}
`;
