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

  const localDateTime = DateTime.local().setZone('Europe/London').toUTC();

  const isAfternoon =
    localDateTime.endOf('day').diff(localDateTime, 'hours').values.hours < 12;

  const startTime_gt = localDateTime
    .plus({ days: isAfternoon ? 2 : 1 })
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
      <Select
        name="deliverySlot"
        ref={register({
          required: 'Please choose collection or a delivery slot',
        })}
      >
        <option value="">Select collection or delivery slot</option>
        <option value="collection">£2.00 - Collect from store</option>
        {Object.keys(deliverySlotsByDay).map(day => (
          <optgroup key={day} label={day}>
            {deliverySlotsByDay[day].map(({ id }) => (
              <DeliverySlotPickerOption key={id} id={id} />
            ))}
          </optgroup>
        ))}
      </Select>
    </Styled.DeliverySlotPicker>
  );
};
