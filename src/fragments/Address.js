import { gql } from '@apollo/client';

export const Address = gql`
  fragment Address on Address {
    id
    street
    deliveryInstructions
    name
    phone
    postcode
  }
`;
