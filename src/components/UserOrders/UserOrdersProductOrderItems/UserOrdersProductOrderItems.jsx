import React from 'react';

import * as Styled from './UserOrdersProductOrderItems.styled';

export const UserOrdersProductOrderItems = ({ orderItems }) => {
  const [
    {
      productVariant: {
        product: { name: productName },
      },
    },
  ] = orderItems;
  return (
    <Styled.Section>
      <Styled.OrderItemHeader>
        <Styled.Name>{productName}</Styled.Name>
        <span>
          {/* £
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
          } */}
        </span>
      </Styled.OrderItemHeader>
      {orderItems.map(
        ({
          quantity,
          productVariant: { container, increment, incrementPrice, name, unit },
        }) => (
          <Styled.Row>
            <Styled.OrderItemProduct>
              {quantity} x{' '}
              {name && unit.singular.trim() === 'item' ? (
                name
              ) : (
                <>
                  <span>
                    {increment}
                    {unit.pluralAbbreviated}
                  </span>
                  {container ? (
                    <Styled.ContainerInfo>
                      {' '}
                      + {container.type}
                    </Styled.ContainerInfo>
                  ) : null}
                </>
              )}
            </Styled.OrderItemProduct>
            <Styled.Price>
              <span>£{Number(+parseFloat(incrementPrice * quantity))}</span>{' '}
              {container ? (
                <Styled.ContainerInfo>
                  + £{Number(+parseFloat(container.price * quantity))}
                </Styled.ContainerInfo>
              ) : null}
            </Styled.Price>
          </Styled.Row>
        ),
      )}
    </Styled.Section>
  );
};
