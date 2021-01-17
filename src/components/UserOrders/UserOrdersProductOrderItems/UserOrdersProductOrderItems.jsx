import React from 'react';

import { formatPrice } from '@helpers';
import { BrandLink } from '@components/ProductCard/BrandLink';

import * as Styled from './UserOrdersProductOrderItems.styled';

export const UserOrdersProductOrderItems = ({ orderItems }) => {
  const [
    {
      productVariant: {
        product: { brand, name: productName },
      },
    },
  ] = orderItems;
  return (
    <Styled.Section>
      <Styled.OrderItemHeader>
        <div>
          {brand ? (
            <div>
              <BrandLink brand={brand} />
            </div>
          ) : null}
          <Styled.Name>{productName}</Styled.Name>
        </div>
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
          productVariant: {
            container,
            increment,
            incrementPrice,
            name: productVariantName,
            unit,
          },
        }) => (
          <Styled.Row>
            <Styled.OrderItemProduct>
              {quantity} x{' '}
              {container && productVariantName
                ? `${container.size} ${container.unit} ${container.type} of `
                : null}
              {productVariantName ? (
                productVariantName
              ) : (
                <>
                  {`${increment}${unit.pluralAbbreviated}`}
                  {container ? (
                    <Styled.ContainerInfo>
                      {` + ${container.size}${container.unit} ${container.type}`}
                    </Styled.ContainerInfo>
                  ) : null}
                </>
              )}
            </Styled.OrderItemProduct>

            <Styled.Price>
              <span>£{formatPrice(incrementPrice * quantity)}</span>{' '}
              {container && Number(container.price) ? (
                <Styled.ContainerInfo>
                  + £{formatPrice(container.price * quantity)}
                </Styled.ContainerInfo>
              ) : null}
            </Styled.Price>
          </Styled.Row>
        ),
      )}
    </Styled.Section>
  );
};
