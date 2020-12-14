import { gql } from '@apollo/client';

import { Address } from '../../../fragments';

export const GET_ADDRESS_BY_ID = gql`
  query OrderDeliveryAddressStreetInputGetAddressById($id: ID!) {
    Address(where: { id: $id }) {
      ...Address
    }
  }
  ${Address}
`;
