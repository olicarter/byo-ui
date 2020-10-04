import { gql } from '@apollo/client';

export const Address = gql`
  fragment Address on Address {
    id
    streetName
    flatNumber
    postCode
  }
`;
