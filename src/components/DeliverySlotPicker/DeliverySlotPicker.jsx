import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { DateTime } from 'luxon';

import { GET_DELIVERY_SLOTS } from './DeliverySlotPicker.gql';
import * as Styled from './DeliverySlotPicker.styled';
import { DeliverySlotPickerOption } from './DeliverySlotPickerOption';
import { Select } from '../Select';

export const DeliverySlotPicker = () => {
  const [selectedDeliverySlot, setSelectedDeliverySlot] = useState('');

  const { data: { allDeliverySlots = [] } = {} } = useQuery(GET_DELIVERY_SLOTS);

  const deliverySlotsByDay = {};

  allDeliverySlots.forEach(deliverySlot => {
    const { startTime } = deliverySlot;
    const st = DateTime.fromISO(startTime, { zone: 'Europe/London' });
    deliverySlotsByDay[st.toFormat('cccc d LLL')] = [
      ...(deliverySlotsByDay[st.toFormat('cccc d LLL')] || []),
      deliverySlot,
    ];
  });

  const handleChange = ({ target: { value } }) => {
    setSelectedDeliverySlot(value);
  };

  return (
    <Styled.DeliverySlotPicker>
      <Select onChange={handleChange} value={selectedDeliverySlot}>
        <option disabled value="">
          Choose a delivery slot
        </option>
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
