import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import Icon from '@mdi/react';
import { mdiBasket } from '@mdi/js';
import { useAuth } from '../../contexts';

import * as Styled from './BasketIcon.styled';
import { GET_UNPAID_ORDER_ITEMS_COUNT } from './BasketIcon.gql';

export const BasketIcon = () => {
  const { user } = useAuth();
  const { id: netlifyId } = user || {};

  const [getUnpaidOrderItemsCount, { data: { allUsers } = {} }] = useLazyQuery(
    GET_UNPAID_ORDER_ITEMS_COUNT,
    {
      fetchPolicy: 'cache-only',
      variables: { netlifyId },
    },
  );

  useEffect(() => {
    if (netlifyId) getUnpaidOrderItemsCount();
  }, [netlifyId]);

  const [{ orders = [] } = {}] = allUsers || [];

  const { orderItems = [] } = orders.find(({ paid }) => !paid) || {};

  return (
    <Styled.BasketIcon>
      <Styled.Counter>{orderItems.length}</Styled.Counter>
      <Icon path={mdiBasket} size={1} title="Basket" />
    </Styled.BasketIcon>
  );
};
