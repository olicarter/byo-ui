import React from 'react';
import pluralize from 'pluralize';

import { formatPrice } from '@helpers';

import * as Styled from './UserOrdersProductOrderItems.styled';

export const UserOrdersProductOrderItems = ({ orderItems }) => {
  const [{ productBrandName = '-', productName }] = orderItems;

  return (
    <Styled.Section>
      <Styled.OrderItemHeader>
        <div>
          {productBrandName ? (
            <div>
              <Styled.BrandName>{productBrandName}</Styled.BrandName>
            </div>
          ) : null}

          <Styled.Name>{productName}</Styled.Name>
        </div>
      </Styled.OrderItemHeader>

      {orderItems.map(
        ({
          productVariantName,
          productVariantContainerPrice,
          productVariantContainerSize,
          productVariantContainerUnit,
          productVariantContainerType,
          productVariantIncrement,
          productVariantIncrementPrice,
          productVariantUnit,
          quantity,
        }) => {
          const isLoose =
            !productVariantContainerSize ||
            (productVariantContainerSize &&
              Number(productVariantContainerPrice));

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
                  {`${
                    isLoose
                      ? productVariantIncrement * quantity
                      : productVariantIncrement
                  }${
                    Number(quantity) * Number(productVariantIncrement) > 1
                      ? productVariantUnit.pluralAbbreviated
                      : productVariantUnit.singularAbbreviated
                  }`}
                  {productVariantContainerSize &&
                  Number(productVariantContainerPrice) ? (
                    <Styled.GreySpan>
                      {` in returnable ${productVariantContainerSize}${productVariantContainerUnit} ${pluralize(
                        productVariantContainerType,
                        Number(quantity) * Number(productVariantIncrement),
                      )}`}
                    </Styled.GreySpan>
                  ) : null}
                  {productVariantContainerSize &&
                  !Number(productVariantContainerPrice)
                    ? ` ${productVariantContainerType}`
                    : null}
                </Styled.OrderItemProduct>
                <Styled.Price>
                  <span>
                    £{formatPrice(productVariantIncrementPrice * quantity)}
                  </span>{' '}
                  {productVariantContainerSize &&
                  Number(productVariantContainerPrice) ? (
                    <Styled.GreySpan>
                      + £{formatPrice(productVariantContainerPrice * quantity)}
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
