import { gql } from '@apollo/client';

import { User } from '../../fragments';

export const GET_USERS_BY_NETLIFY_ID = gql`
  query AuthContextGetUsersByAuth0Id($auth0Id: String!) {
    allUsers(where: { auth0Id: $auth0Id }) {
      ...User
    }
  }
  ${User}
`;

export const CREATE_USER = gql`
  mutation AuthContextCreateUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $auth0Id: String!
  ) {
    createUser(
      data: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        auth0Id: $auth0Id
      }
    ) {
      ...User
    }
  }
  ${User}
`;
