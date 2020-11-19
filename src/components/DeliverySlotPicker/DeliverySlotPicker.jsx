import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DateTime } from 'luxon';

import {
  GET_AUTHENTICATED_USER,
  GET_DELIVERY_SLOTS,
  SET_ORDER_DELIVERY_SLOT,
} from './DeliverySlotPicker.gql';
import * as Styled from './DeliverySlotPicker.styled';
import { DeliverySlotPickerOption } from './DeliverySlotPickerOption';
import { Select } from '../Select';

export const DeliverySlotPicker = () => {
  const {
    data: { allDeliverySlots } = {},
    loading: getDeliverySlotsLoading,
  } = useQuery(GET_DELIVERY_SLOTS);

  const {
    data: { authenticatedUser } = {},
    loading: getAuthenticatedUserLoading,
  } = useQuery(GET_AUTHENTICATED_USER);

  const { orders = [] } = authenticatedUser || {};
  const { id: unsubmittedOrderId, deliverySlot } =
    orders.find(({ submitted }) => !submitted) || {};
  const { id: unsubmittedOrderDeliverySlotId = '' } = deliverySlot || {};

  /** @todo update delivery slot count after mutation */
  const [
    setOrderDeliverySlot,
    { loading: setOrderDeliverySlotLoading },
  ] = useMutation(SET_ORDER_DELIVERY_SLOT);

  const deliverySlotsByDay = {};

  (allDeliverySlots || []).forEach(deliverySlot => {
    const { startTime } = deliverySlot;
    const dt = DateTime.fromObject({ zone: 'Europe/London' });
    const st = DateTime.fromISO(startTime, { zone: 'Europe/London' });
    if (dt.startOf('day') < st.startOf('day')) {
      deliverySlotsByDay[st.toFormat('cccc d LLL')] = [
        ...(deliverySlotsByDay[st.toFormat('cccc d LLL')] || []),
        deliverySlot,
      ];
    }
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
