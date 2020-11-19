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
  mutation UpdateUserInformation($id: ID!, $name: String!, $email: String!) {
    updateUser(id: $id, data: { name: $name, email: $email }) {
      ...User
    }
  }
  ${User}
`;
