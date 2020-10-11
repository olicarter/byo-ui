import React from 'react';
import { useQuery } from '@apollo/client';
import { DateTime } from 'luxon';

import {
  COUNT_DELIVERY_SLOT_ORDERS,
  GET_DELIVERY_SLOT,
} from './DeliverySlotPicker.gql';

export const DeliverySlotPickerOption = ({ id }) => {
  const { data: { DeliverySlot } = {} } = useQuery(GET_DELIVERY_SLOT, {
    variables: { id },
  });

  const { startTime, endTime, maxOrders } = DeliverySlot || {};

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
    <option
      disabled={count > maxOrders}
      value={`${startDateTime.ts}-${endDateTime.ts}`}
    >
      {startDateTime.toLocaleString(DateTime.TIME_24_SIMPLE)} -{' '}
      {endDateTime.toLocaleString(DateTime.TIME_24_SIMPLE)},{' '}
      {startDateTime.toFormat('cccc d LLL')}
    </option>
  );
};
