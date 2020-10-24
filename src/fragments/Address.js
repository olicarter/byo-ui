import { gql } from '@apollo/client';

export const Address = gql`
  fragment Address on Address {
    id
    firstName
    lastName
    phoneNumber
    street
    flatNumber
    postCode
  }
`;
