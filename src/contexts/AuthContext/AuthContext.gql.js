import { gql } from '@apollo/client';

export const GET_USER = gql`
  query($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      id
    }
  }
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
      id
    }
  }
`;
