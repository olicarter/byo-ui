import React from 'react';
import { useQuery } from '@apollo/client';
import { DateTime } from 'luxon';
import { useFormContext } from 'react-hook-form';

import { Select } from '@components/Select';

import { GET_DELIVERY_SLOTS } from './DeliverySlotPicker.gql';
import * as Styled from './DeliverySlotPicker.styled';
import { DeliverySlotPickerOption } from './DeliverySlotPickerOption';

export const DeliverySlotPicker = () => {
  const { register } = useFormContext();

  const localDateTime = DateTime.local().setZone('Europe/London');

  const startTime_gt = localDateTime
    .toUTC()
    .plus({ days: 1 })
    .startOf('day')
    .toISO();

  const { data: { allDeliverySlots } = {} } = useQuery(GET_DELIVERY_SLOTS, {
    variables: { startTime_gt },
  });

  const deliverySlotsByDay = {};

  (allDeliverySlots || []).forEach(deliverySlot => {
    const { startTime } = deliverySlot;
    const st = DateTime.fromISO(startTime, { zone: 'Europe/London' });
    deliverySlotsByDay[st.toFormat('cccc d LLL')] = [
      ...(deliverySlotsByDay[st.toFormat('cccc d LLL')] || []),
      deliverySlot,
    ];
  });

  return (
    <Styled.DeliverySlotPicker>
      <Select name="deliverySlot" ref={register()}>
        <option value="">Collect from store</option>
        {Object.keys(deliverySlotsByDay).map(day => (
          <optgroup label={day}>
            {deliverySlotsByDay[day].map(({ id }) => (
              <DeliverySlotPickerOption key={id} id={id} />
            ))}
          </optgroup>
        ))}
      </Select>
    </Styled.DeliverySlotPicker>
  );
};
