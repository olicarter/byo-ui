import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import Icon from '@mdi/react';
import { mdiBasket } from '@mdi/js';

import { useAuth } from '../../contexts';
import { GET_USERS_BY_NETLIFY_ID } from './BasketIcon.gql';
import * as Styled from './BasketIcon.styled';

export const BasketIcon = () => {
  const { user } = useAuth();
  const { id: netlifyId } = user || {};

  const [
    getUsersByNetlifyId,
    { data: { allUsers } = {} },
  ] = useLazyQuery(GET_USERS_BY_NETLIFY_ID, { variables: { netlifyId } });

  useEffect(() => {
    if (netlifyId) getUsersByNetlifyId();
  }, [netlifyId, getUsersByNetlifyId]);

  const [{ orders = [] } = {}] = allUsers || [];
  const { orderItems = [] } = orders.find(({ submitted }) => !submitted) || {};

  return (
    <Styled.BasketIcon>
      <Styled.Counter>{orderItems.length}</Styled.Counter>
      <Icon path={mdiBasket} size={1} title="Basket" />
    </Styled.BasketIcon>
  );
};
