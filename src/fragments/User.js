import { gql } from '@apollo/client';

import { Orders } from './Orders';
import { Address } from './Address';

export const User = gql`
  fragment User on User {
    id
    firstName
    lastName
    email
    netlifyId
    ...Orders
    address {
      ...Address
    }
  }
  ${Orders}
  ${Address}
`;
