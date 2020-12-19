import { gql } from '@apollo/client';

import { User } from '@fragments';

export const AUTHENTICATE_USER = gql`
  mutation LoginFormAuthenticateUser($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      token
      item {
        ...User
      }
    }
  }
  ${User}
`;
