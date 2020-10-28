import { gql } from '@apollo/client';

import { User } from '../../fragments';

export const GET_USERS_BY_NETLIFY_ID = gql`
  query UserAddressFormGetUsersByAuth0Id($auth0Id: String!) {
    allUsers(where: { auth0Id: $auth0Id }) {
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
