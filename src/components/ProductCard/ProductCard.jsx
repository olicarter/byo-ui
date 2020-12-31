import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useInView } from 'react-intersection-observer';

import { getUnsubmittedOrderFromUser } from '@helpers';
import { Card } from '@components/Card';

import * as Styled from './ProductCard.styled';
import {
  GET_AUTHENTICATED_USER,
  GET_PRODUCT_VARIANTS,
} from './ProductCard.gql';
import { LoadingProductVariants } from './LoadingProductVariants';
import { ProductVariant } from './ProductVariant';
import { ProductCardOrderSummary } from './ProductCardOrderSummary';
import { TagList } from './TagList';

export const ProductCard = ({
  deliveryInfo,
  id: productId,
  image,
  name,
  origin,
  slug,
}) => {
  const { ref, inView } = useInView();

  const { data: { Product } = {} } = useQuery(GET_PRODUCT_VARIANTS, {
    fetchPolicy: 'cache-only',
    variables: { id: productId },
  });

  const [
    getProductVariants,
    { called: getProductVariantsCalled },
  ] = useLazyQuery(GET_PRODUCT_VARIANTS, {
    variables: { id: productId },
  });

  useEffect(() => {
    if (inView && !getProductVariantsCalled) getProductVariants();
  }, [getProductVariants, getProductVariantsCalled, inView]);

  const { variants = [] } = Product || {};
  let { brand } = Product || {};

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

  if (brand === null) brand = { name: 'Unbranded' };

  const { name: brandName = '' } = brand || {};

  return (
    <Card ref={ref}>
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
            <Styled.Brand>{brandName}</Styled.Brand>
            <TagList productId={productId} />
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
            <Styled.Origin>{origin}</Styled.Origin>
          </div>
        </Styled.Info>
      </Styled.Content>

      <Styled.ProductVariants>
        {!getProductVariantsCalled || !Product ? (
          <LoadingProductVariants />
        ) : (
          variants.map((variant, index) => (
            <div
              onMouseOut={() => setMouseOverVariantIndex(0)}
              onMouseOver={() => setMouseOverVariantIndex(index)}
            >
              <ProductVariant key={variant.id} variant={variant} />
            </div>
          ))
        )}
      </Styled.ProductVariants>

      <Styled.Buttons>
        {!!orderItems.length ? (
          <ProductCardOrderSummary orderItems={orderItems} />
        ) : null}
      </Styled.Buttons>
    </Card>
  );
};
