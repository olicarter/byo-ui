import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import Icon from '@mdi/react';
import { mdiInformationOutline, mdiMapMarker } from '@mdi/js';
import { useInView } from 'react-intersection-observer';

import { getUnsubmittedOrderFromUser } from '@helpers';
import * as Styled from './ProductCard.styled';
import {
  GET_AUTHENTICATED_USER,
  GET_PRODUCT_VARIANTS,
} from './ProductCard.gql';
import { LoadingProductVariants } from './LoadingProductVariants';
import { ProductVariant } from './ProductVariant';
import { ProductCardOrderSummary } from './ProductCardOrderSummary';
import { Card } from '../Card';

export const ProductCard = ({
  id: productId,
  image,
  name,
  deliveryInfo,
  origin,
  slug,
}) => {
  const { push } = useHistory();

  const { ref, inView } = useInView();

  const { data: { Product } = {} } = useQuery(GET_PRODUCT_VARIANTS, {
    fetchPolicy: 'cache-only',
    variables: { id: productId },
  });

  const [
    getProductVariants,
    { called: getProductVariantsCalled, loading: getProductVariantsLoading },
  ] = useLazyQuery(GET_PRODUCT_VARIANTS, {
    variables: { id: productId },
  });

  useEffect(() => {
    if (inView) getProductVariants();
  }, [getProductVariants, inView]);

  const { variants = [] } = Product || {};

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
          <Styled.Name>{name}</Styled.Name>
          <Styled.InfoIcon onClick={() => push(`/products/${slug}`)}>
            <Icon path={mdiInformationOutline} size={0.8} />
          </Styled.InfoIcon>
        </Styled.Header>
        <Styled.Info>
          {!!orderItems.length ? (
            <Styled.DeliveryInfo>
              {deliveryInfo || defaultDeliveryInfo}
            </Styled.DeliveryInfo>
          ) : (
            <div>
              {origin ? (
                <Styled.Origin>
                  <Icon path={mdiMapMarker} size={0.5} />
                  <span>{origin}</span>
                </Styled.Origin>
              ) : null}
            </div>
          )}
        </Styled.Info>
      </Styled.Content>

      <div>
        {!getProductVariantsCalled || getProductVariantsLoading ? (
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
      </div>

      <Styled.Buttons>
        {!!orderItems.length ? (
          <ProductCardOrderSummary orderItems={orderItems} />
        ) : null}
      </Styled.Buttons>
    </Card>
  );
};
