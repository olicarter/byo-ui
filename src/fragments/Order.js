import { gql } from '@apollo/client';

import { DeliverySlot } from './DeliverySlot';
import { OrderItems } from './OrderItems';

export const Order = gql`
  fragment Order on Order {
    id
    deliverySlot {
      ...DeliverySlot
    }
    ...OrderItems
    paid
    submitted
  }
  ${DeliverySlot}
  ${OrderItems}
`;
