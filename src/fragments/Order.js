import { gql } from '@apollo/client';

import { OrderItems } from './OrderItems';

export const Order = gql`
  fragment Order on Order {
    id
    paid
    ...OrderItems
  }
  ${OrderItems}
`;
