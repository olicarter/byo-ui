import React from 'react';

import * as Styled from '../UserOrders.styled';

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
