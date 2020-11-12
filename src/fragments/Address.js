import { gql } from '@apollo/client';

import { Postcode } from './Postcode';

export const Address = gql`
  fragment Address on Address {
    id
    address
    deliveryInstructions
    name
    phone
    postcode {
      ...Postcode
    }
  }
  ${Postcode}
`;
