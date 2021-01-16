import { gql } from '@apollo/client';

import { DeliverySlot } from '@fragments';

export const GET_DELIVERY_SLOTS = gql`
  query DeliverySlotPickerGetDeliverySlots($startTime_gt: String) {
    allDeliverySlots(
      where: { startTime_gt: $startTime_gt }
      sortBy: startTime_ASC
    ) {
      ...DeliverySlot
    }
  }
  ${DeliverySlot}
`;
