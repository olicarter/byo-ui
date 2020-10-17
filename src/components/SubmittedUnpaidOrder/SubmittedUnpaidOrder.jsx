import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { DateTime } from 'luxon';

import { useAuth } from '../../contexts';
import { GET_USER } from './SubmittedUnpaidOrder.gql';
import * as Styled from './SubmittedUnpaidOrder.styled';
import { SubTitle } from '../Typography';

export const SubmittedUnpaidOrder = () => {
  const { user } = useAuth();
  const { id: netlifyId } = user || {};

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
  const { deliverySlot: { startTime, endTime } = {} } =
    orders.find(({ paid, submitted }) => submitted && !paid) || {};

  if (getUserLoading) return null;

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
