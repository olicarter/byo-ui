import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { DateTime } from 'luxon';

import { GET_AUTHENTICATED_USER } from './SubmittedUnpaidOrder.gql';
import * as Styled from './SubmittedUnpaidOrder.styled';
import { SubTitle } from '../Typography';

export const SubmittedUnpaidOrder = () => {
  const {
    data: { authenticatedUser } = {},
    loading: getAuthenticatedUserLoading,
  } = useLazyQuery(GET_AUTHENTICATED_USER);

  const { orders = [] } = authenticatedUser || {};
  const submittedUnpaidOrder = orders.find(
    ({ paid, submitted }) => submitted && !paid,
  );

  if (getAuthenticatedUserLoading || !submittedUnpaidOrder) return null;

  const { deliverySlot: { startTime, endTime } = {} } =
    submittedUnpaidOrder || {};

  const st = DateTime.fromISO(startTime, {
    zone: 'Europe/London',
  }).toLocaleString(DateTime.TIME_SIMPLE);
  const et = DateTime.fromISO(endTime, {
    zone: 'Europe/London',
  }).toLocaleString(DateTime.TIME_SIMPLE);
  const day = DateTime.fromISO(startTime, {
    zone: 'Europe/London',
  }).toFormat('cccc d LLLL');

  return (
    <Styled.Header>
      <SubTitle margin="0">
        Your order is being delivered between {st} and {et} on {day}
      </SubTitle>
    </Styled.Header>
  );
};
