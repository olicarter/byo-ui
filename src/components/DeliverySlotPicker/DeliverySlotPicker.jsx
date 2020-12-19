import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DateTime } from 'luxon';
import { useFormContext } from 'react-hook-form';

import { getUnsubmittedOrderFromUser } from '@helpers';
import {
  GET_AUTHENTICATED_USER,
  GET_DELIVERY_SLOTS,
  SET_ORDER_DELIVERY_SLOT,
} from './DeliverySlotPicker.gql';
import * as Styled from './DeliverySlotPicker.styled';
import { DeliverySlotPickerOption } from './DeliverySlotPickerOption';
import { Select } from '../Select';

export const DeliverySlotPicker = () => {
  const { register } = useFormContext();

  const localDateTime = DateTime.local().setZone('Europe/London');

  const startTime_gt = localDateTime
    .toUTC()
    .plus({ days: 1 })
    .startOf('day')
    .toISO();

  const {
    data: { allDeliverySlots } = {},
    loading: getDeliverySlotsLoading,
  } = useQuery(GET_DELIVERY_SLOTS, { variables: { startTime_gt } });

  const {
    data: { authenticatedUser } = {},
    loading: getAuthenticatedUserLoading,
  } = useQuery(GET_AUTHENTICATED_USER);

  const { id: unsubmittedOrderId, deliverySlot } = getUnsubmittedOrderFromUser(
    authenticatedUser,
  );
  const { id: unsubmittedOrderDeliverySlotId = '' } = deliverySlot || {};

  /** @todo update delivery slot count after mutation */
  const [
    setOrderDeliverySlot,
    { loading: setOrderDeliverySlotLoading },
  ] = useMutation(SET_ORDER_DELIVERY_SLOT);

  const deliverySlotsByDay = {};

  (allDeliverySlots || []).forEach(deliverySlot => {
    const { startTime } = deliverySlot;
    const st = DateTime.fromISO(startTime, { zone: 'Europe/London' });
    deliverySlotsByDay[st.toFormat('cccc d LLL')] = [
      ...(deliverySlotsByDay[st.toFormat('cccc d LLL')] || []),
      deliverySlot,
    ];
  });

  const handleChange = ({ target: { value } }) => {
    if (unsubmittedOrderId) {
      setOrderDeliverySlot({
        variables: { id: unsubmittedOrderId, deliverySlotId: value },
      });
    }
  };

  return (
    <Styled.DeliverySlotPicker>
      <Select
        loading={(() => {
          if (getDeliverySlotsLoading || getAuthenticatedUserLoading)
            return 'Loading delivery slots...';
          if (setOrderDeliverySlotLoading) return 'Selecting slot...';
          return undefined;
        })()}
        name="deliverySlot"
        onChange={handleChange}
        ref={register({
          required: 'You must select a delivery slot',
        })}
        value={unsubmittedOrderDeliverySlotId}
      >
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
