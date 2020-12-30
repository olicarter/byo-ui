import { gql } from '@apollo/client';

export const RESET_USER_PASSWORD = gql`
  mutation ResetPasswordFormResetUserPassword(
    $email: String!
    $password: String!
    $token: String!
  ) {
    resetPassword(email: $email, password: $password, token: $token)
  }
`;
