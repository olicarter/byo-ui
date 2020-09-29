import { gql } from '@apollo/client';

import { Order } from './Order';

export const Orders = gql`
  fragment Orders on User {
    orders {
      ...Order
    }
  }
  ${Order}
`;
