import { gql } from '@apollo/client';

import { Orders } from './Orders';
import { Address } from './Address';

export const User = gql`
  fragment User on User {
    id
    firstName
    lastName
    email
    auth0Id
    ...Orders
    address {
      ...Address
    }
  }
  ${Orders}
  ${Address}
`;
