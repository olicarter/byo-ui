import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

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
  brand,
  deliveryInfo,
  id: productId,
  image,
  name,
  origin,
  slug,
  tags,
  variants = [],
}) => {
  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const { orderItems: allOrderItems = [] } = getUnsubmittedOrderFromUser(
    authenticatedUser,
  );
  const orderItems = allOrderItems.filter(
    ({ productVariant: { product: { id: orderItemProductId } = {} } = {} }) =>
      orderItemProductId === productId,
  );

  const defaultDeliveryInfo = (() => {
    if (
      variants.every(({ container }) => container && !!Number(container.price))
    )
      return 'Delivered in refundable containers';
    if (
      variants.every(({ container }) => container && !Number(container.price))
    )
      return 'Delivered in non-refundable containers';
    return 'Delivered in cotton bags';
  })();

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
            <Styled.Name color="red" to={`/products/${slug}`}>
              {name}
            </Styled.Name>
          </Styled.HeaderLower>
        </Styled.Header>

        <Styled.Info>
          {!!orderItems.length ? (
            <Styled.DeliveryInfo>
              {deliveryInfo || defaultDeliveryInfo}
            </Styled.DeliveryInfo>
          ) : null}

          <div>
            <OriginLink origin={origin} />
          </div>
        </Styled.Info>
      </Styled.Content>

      <Styled.ProductVariants>
        {variants.map((variant, index) => (
          <div
            onMouseOut={() => setMouseOverVariantIndex(0)}
            onMouseOver={() => setMouseOverVariantIndex(index)}
          >
            <ProductVariant
              key={variant.id}
              productTags={tags}
              variant={variant}
            />
          </div>
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
