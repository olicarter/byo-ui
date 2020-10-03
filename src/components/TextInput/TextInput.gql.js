import { gql } from '@apollo/client';

export const GET_USER = gql`
  query($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      id
      firstName
      lastName
      email
    }
  }
`;
