import { gql } from '@apollo/client';

export const GET_USERS_BY_EMAIL = gql`
  query LoginModalGetUsersByEmail($email: String!) {
    allUsers(where: { email: $email }) {
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation LoginModalCreateUser(
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
      id
    }
  }
`;

export const GET_USERS_BY_NETLIFY_ID = gql`
  query($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      id
    }
  }
`;
