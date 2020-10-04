import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useAuth } from '../../../contexts';
// import { GET_USERS_BY_NETLIFY_ID } from './UserOrders.gql';
import * as Styled from '../UserOrders.styled';
// import { SubTitle } from '../Typography';

export const UserOrdersProductOrderItems = ({ orderItems }) => {
  const [
    {
      productVariant: {
        product: { name },
      },
    },
  ] = orderItems;
  return (
    <Styled.Section>
      <Styled.OrderItemHeader>
        <Styled.Name>{name}</Styled.Name>
        <span>
          £
          {
            +parseFloat(
              Math.round(
                orderItems.reduce(
                  (prev, curr) =>
                    prev +
                    Number(curr.quantity) *
                      Number(curr.productVariant.incrementPrice),
                  0,
                ) * 100,
              ) / 100,
            )
          }
        </span>
      </Styled.OrderItemHeader>
      {orderItems.map(
        ({
          quantity,
          productVariant: { container, increment, incrementPrice, unit },
        }) => (
          <Styled.Row>
            <span>
              {quantity} x {increment}
              {unit.pluralAbbreviated}
              {container ? ` + ${container.type}` : ''}
            </span>
            £{+parseFloat(incrementPrice * quantity)}
          </Styled.Row>
        ),
      )}
    </Styled.Section>
  );
};
