import { gql } from '@apollo/client';

import { DeliverySlot, Order, User } from '../../fragments';

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

export const GET_AUTHENTICATED_USER = gql`
  query BasketIconGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;

export const SET_ORDER_DELIVERY_SLOT = gql`
  mutation DeliverySlotPickerUpdateOrder($id: ID!, $deliverySlotId: ID!) {
    updateOrder(
      id: $id
      data: { deliverySlot: { connect: { id: $deliverySlotId } } }
    ) {
      ...Order
    }
  }
  ${Order}
`;
