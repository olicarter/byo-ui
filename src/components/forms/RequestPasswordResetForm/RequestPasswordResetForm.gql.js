import { gql } from '@apollo/client';

export const SEND_PASSWORD_RESET_EMAIL = gql`
  mutation RequestPasswordResetFormSendPasswordResetEmail($email: String!) {
    sendPasswordResetEmail(email: $email)
  }
`;
