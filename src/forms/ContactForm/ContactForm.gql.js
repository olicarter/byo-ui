import { gql } from '@apollo/client';

export const SEND_CONTACT_FORM = gql`
  mutation ContactFormSendContactForm(
    $email: String!
    $message: String!
    $name: String!
  ) {
    sendContactForm(email: $email, message: $message, name: $name)
  }
`;
