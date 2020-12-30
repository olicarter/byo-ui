import { gql } from '@apollo/client';

export const COUNT_USERS_BY_EMAIL_AND_TOKEN = gql`
  query ResetPasswordPageGetUserByEmailAndToken(
    $email: String!
    $token: String!
  ) {
    _allUsersMeta(where: { email: $email, passwordResetToken: $token }) {
      count
    }
  }
`;
