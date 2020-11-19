import { gql } from '@apollo/client';

import { User } from '../../fragments';

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
    $password: String!
    $name: String!
    $phone: String!
  ) {
    createUser(
      data: { email: $email, password: $password, name: $name, phone: $phone }
    ) {
      ...User
    }
  }
  ${User}
`;
