import React from 'react';
import pluralize from 'pluralize';

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
      </Styled.OrderItemHeader>

      {orderItems.map(
        ({
          productVariant: {
            container,
            increment,
            incrementPrice,
            name: productVariantName,
            unit,
          },
          quantity,
        }) => {
          const isLoose =
            ['g', 'kg', 'ml', 'L', ' liner', ' tampon', ' pad'].includes(
              unit.singularAbbreviated,
            ) &&
            (!container || (container && Number(container.price)));

          return (
            <>
              {productVariantName ? (
                <div>
                  <Styled.ProductVariantName>
                    {productVariantName}
                  </Styled.ProductVariantName>
                </div>
              ) : null}

              <Styled.Row>
                <Styled.OrderItemProduct>
                  {isLoose ? null : `${quantity} x `}
                  {`${isLoose ? increment * quantity : increment}${
                    unit.pluralAbbreviated
                  }`}
                  {container && Number(container.price) ? (
                    <Styled.GreySpan>
                      {` in returnable ${container.size}${
                        container.unit
                      } ${pluralize(container.type, quantity)}`}
                    </Styled.GreySpan>
                  ) : null}
                  {container && !Number(container.price)
                    ? ` ${container.type}`
                    : null}
                </Styled.OrderItemProduct>
                <Styled.Price>
                  <span>£{formatPrice(incrementPrice * quantity)}</span>{' '}
                  {container && Number(container.price) ? (
                    <Styled.GreySpan>
                      + £{formatPrice(container.price * quantity)}
                    </Styled.GreySpan>
                  ) : null}
                </Styled.Price>
              </Styled.Row>
            </>
          );
        },
      )}
    </Styled.Section>
  );
};
