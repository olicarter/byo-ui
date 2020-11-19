import { gql } from '@apollo/client';

export const Address = gql`
  fragment Address on Address {
    id
    name
    phoneNumber
    street
    flatNumber
    postCode
  }
`;
