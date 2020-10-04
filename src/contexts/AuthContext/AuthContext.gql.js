import { gql } from '@apollo/client';

import { User } from '../../fragments';

export const GET_USERS_BY_NETLIFY_ID = gql`
  query($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      ...User
    }
  }
  ${User}
`;

export const CREATE_USER = gql`
  mutation(
    $email: String!
    $firstName: String!
    $lastName: String!
    $netlifyId: String!
  ) {
    createUser(
      data: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        netlifyId: $netlifyId
      }
    ) {
      ...User
    }
  }
  ${User}
`;
