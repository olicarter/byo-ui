import React, { useEffect } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { DateTime } from 'luxon';

import { useAuth } from '../../contexts';
import {
  GET_DELIVERY_SLOTS,
  GET_USER,
  SET_ORDER_DELIVERY_SLOT,
} from './DeliverySlotPicker.gql';
import * as Styled from './DeliverySlotPicker.styled';
import { DeliverySlotPickerOption } from './DeliverySlotPickerOption';
import { Select } from '../Select';

export const DeliverySlotPicker = () => {
  const { user } = useAuth();
  const { id: netlifyId } = user || {};

  const {
    data: { allDeliverySlots } = {},
    loading: getDeliverySlotsLoading,
  } = useQuery(GET_DELIVERY_SLOTS);

  const [
    getUser,
    { data: { allUsers } = {}, loading: getUserLoading },
  ] = useLazyQuery(GET_USER, {
    variables: { netlifyId },
  });

  useEffect(() => {
    if (netlifyId) getUser();
  }, [netlifyId, getUser]);

  const [{ orders = [] } = {}] = allUsers || [];
  const { id: unsubmittedOrderId, deliverySlot } =
    orders.find(({ submitted }) => !submitted) || {};
  const { id: unsubmittedOrderDeliverySlotId = '' } = deliverySlot || {};

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
          if (getDeliverySlotsLoading || getUserLoading)
            return 'Loading delivery slots...';
          if (setOrderDeliverySlotLoading) return 'Selecting slot...';
          return undefined;
        })()}
        onChange={handleChange}
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
