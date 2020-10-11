import { gql } from '@apollo/client';

import { DeliverySlot } from '../../fragments';

export const GET_DELIVERY_SLOTS = gql`
  query DeliverySlotPickerGetDeliverySlots {
    allDeliverySlots {
      ...DeliverySlot
    }
  }
  ${DeliverySlot}
`;

export const GET_DELIVERY_SLOT = gql`
  query DeliverySlotPickerGetDeliverySlot($id: ID!) {
    DeliverySlot(where: { id: $id }) {
      ...DeliverySlot
    }
  }
  ${DeliverySlot}
`;

export const COUNT_DELIVERY_SLOT_ORDERS = gql`
  query DeliverySlotPickerCountDeliverySlotOrders($id: ID!) {
    _allOrdersMeta(where: { deliverySlot: { id: $id } }) {
      count
    }
  }
`;
