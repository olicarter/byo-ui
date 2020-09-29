import { gql } from '@apollo/client';

import { OrderItem } from './OrderItem';

export const OrderItems = gql`
  fragment OrderItems on Order {
    orderItems {
      ...OrderItem
    }
  }
  ${OrderItem}
`;
