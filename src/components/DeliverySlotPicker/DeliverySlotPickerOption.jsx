import React from 'react';
import { useQuery } from '@apollo/client';
import { DateTime } from 'luxon';

import { formatPrice } from '@helpers';

import {
  COUNT_DELIVERY_SLOT_ORDERS,
  GET_DELIVERY_SLOT,
} from './DeliverySlotPickerOption.gql';

export const DeliverySlotPickerOption = ({ id }) => {
  const { data: { DeliverySlot } = {} } = useQuery(GET_DELIVERY_SLOT, {
    variables: { id },
  });

  const { startTime, endTime, deliveryCharge, maxOrders } = DeliverySlot || {};

  const { data: { _allOrdersMeta: { count } = {} } = {} } = useQuery(
    COUNT_DELIVERY_SLOT_ORDERS,
    {
      variables: { id },
    },
  );

  const startDateTime = DateTime.fromISO(startTime, {
    zone: 'Europe/London',
  });
  const endDateTime = DateTime.fromISO(endTime, {
    zone: 'Europe/London',
  });

  return (
    <option disabled={count > maxOrders} value={id}>
      {deliveryCharge * 1 ? `£${formatPrice(deliveryCharge)}` : 'Free'} -{' '}
      {startDateTime.toLocaleString(DateTime.TIME_24_SIMPLE)}-
      {endDateTime.toLocaleString(DateTime.TIME_24_SIMPLE)},{' '}
      {startDateTime.toFormat('cccc d LLL')}
    </option>
  );
};
