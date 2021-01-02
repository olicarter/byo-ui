import { gql } from '@apollo/client';

import { Address } from './Address';
import { DeliverySlot } from './DeliverySlot';
import { OrderItems } from './OrderItems';

export const Order = gql`
  fragment Order on Order {
    id
    createdAt
    orderNumber
    paid
    submitted
    address {
      ...Address
    }
    deliverySlot {
      ...DeliverySlot
    }
    ...OrderItems
  }
  ${Address}
  ${DeliverySlot}
  ${OrderItems}
`;
