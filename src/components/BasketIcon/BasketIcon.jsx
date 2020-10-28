import React from 'react';
import { useQuery } from '@apollo/client';
import Icon from '@mdi/react';
import { mdiBasketOutline } from '@mdi/js';

import { GET_AUTHENTICATED_USER } from './BasketIcon.gql';
import * as Styled from './BasketIcon.styled';

export const BasketIcon = () => {
  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const { orders = [] } = authenticatedUser || {};
  const { orderItems = [] } = orders.find(({ submitted }) => !submitted) || {};

  return (
    <Styled.BasketIcon>
      <Styled.Counter>{orderItems.length}</Styled.Counter>
      <Icon path={mdiBasketOutline} size={1} title="Basket" />
    </Styled.BasketIcon>
  );
};
