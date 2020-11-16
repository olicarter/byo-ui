import { gql } from '@apollo/client';

import { Orders } from './Orders';
import { Address } from './Address';

export const User = gql`
  fragment User on User {
    id
    name
    email
    phone
    ...Orders
    addresses {
      ...Address
    }
  }
  ${Orders}
  ${Address}
`;
