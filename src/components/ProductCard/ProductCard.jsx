import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ErrorBoundary } from '@sentry/react';

import { getUnsubmittedOrderFromUser } from '@helpers';
import { Card } from '@components/Card';

import * as Styled from './ProductCard.styled';
import { GET_AUTHENTICATED_USER } from './ProductCard.gql';
import { BrandLink } from './BrandLink';
// import { LoadingProductVariants } from './LoadingProductVariants';
import { ProductVariant } from './ProductVariant';
import { OriginLink } from './OriginLink';
import { ProductCardOrderSummary } from './ProductCardOrderSummary';
import { TagList } from './TagList';

export const ProductCard = ({
  product: {
    brand,
    deliveryInfo,
    id: productId,
    image,
    name,
    origin,
    slug,
    tags,
    variants = [],
  },
  showOnlyVariantsInOrder,
}) => {
  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const { orderItems: allOrderItems = [] } = getUnsubmittedOrderFromUser(
    authenticatedUser,
  );
  const orderItems = allOrderItems.filter(
    ({ productVariant: { product: { id: orderItemProductId } = {} } = {} }) =>
      orderItemProductId === productId,
  );

  const productVariantsInOrder = variants.filter(variant =>
    orderItems.find(orderItem => variant.id === orderItem.productVariant.id),
  );

  const visibleVariants = showOnlyVariantsInOrder
    ? productVariantsInOrder
    : variants;

  const [mouseOverVariantIndex, setMouseOverVariantIndex] = useState(0);

  const { image: variantImage } = variants[mouseOverVariantIndex] || {};
  const { publicUrl = '' } = image || variantImage || {};

  return (
    <Card>
      <Styled.Content>
        {publicUrl ? (
          <Styled.ImageWrapper>
            <Styled.Image src={publicUrl} />
          </Styled.ImageWrapper>
        ) : (
          <Styled.Border />
        )}

        <Styled.Header>
          <Styled.HeaderUpper>
            <BrandLink brand={brand} />
            <TagList tags={tags} />
          </Styled.HeaderUpper>

          <Styled.HeaderLower>
            <Styled.Name
              as="span"
              color="red"
              // to={`/products/${slug}`}
            >
              {name}
            </Styled.Name>
          </Styled.HeaderLower>
        </Styled.Header>

        <Styled.Info>
          {!!orderItems.length && deliveryInfo ? (
            <Styled.DeliveryInfo>{deliveryInfo}</Styled.DeliveryInfo>
          ) : null}

          <div>
            <OriginLink origin={origin} />
          </div>
        </Styled.Info>
      </Styled.Content>

      <Styled.ProductVariants>
        {visibleVariants.map((variant, index) => (
          <ErrorBoundary>
            <div
              key={variant.id}
              onMouseOut={() => setMouseOverVariantIndex(0)}
              onMouseOver={() => setMouseOverVariantIndex(index)}
            >
              <ProductVariant productTags={tags} variant={variant} />
            </div>
          </ErrorBoundary>
        ))}
      </Styled.ProductVariants>

      <Styled.Buttons>
        {!!orderItems.length ? (
          <ProductCardOrderSummary orderItems={orderItems} />
        ) : null}
      </Styled.Buttons>
    </Card>
  );
};
