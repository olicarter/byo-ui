import { gql } from '@apollo/client';

export const DeliverySlot = gql`
  fragment DeliverySlot on DeliverySlot {
    id
    startTime
    endTime
    deliveryCharge
    maxOrders
  }
`;
