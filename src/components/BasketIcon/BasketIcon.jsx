import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import Icon from '@mdi/react';
import { mdiBasketOutline } from '@mdi/js';

import { useAuth } from '../../contexts';
import { GET_USERS_BY_NETLIFY_ID } from './BasketIcon.gql';
import * as Styled from './BasketIcon.styled';

export const BasketIcon = () => {
  const { user } = useAuth();
  const { sub: auth0Id } = user || {};

  const [
    getUsersByAuth0Id,
    { data: { allUsers } = {} },
  ] = useLazyQuery(GET_USERS_BY_NETLIFY_ID, { variables: { auth0Id } });

  useEffect(() => {
    if (auth0Id) getUsersByAuth0Id();
  }, [auth0Id, getUsersByAuth0Id]);

  const [{ orders = [] } = {}] = allUsers || [];
  const { orderItems = [] } = orders.find(({ submitted }) => !submitted) || {};

  return (
    <Styled.BasketIcon>
      <Styled.Counter>{orderItems.length}</Styled.Counter>
      <Icon path={mdiBasketOutline} size={1} title="Basket" />
    </Styled.BasketIcon>
  );
};
