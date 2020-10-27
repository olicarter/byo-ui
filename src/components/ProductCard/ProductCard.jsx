import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import Icon from '@mdi/react';
import { mdiInformationOutline, mdiMapMarker } from '@mdi/js';

import { useAuth } from '../../contexts';
import * as Styled from './ProductCard.styled';
import { GET_USER } from './ProductCard.gql';
import { ProductVariant } from './ProductVariant';
import { ProductCardOrderSummary } from './ProductCardOrderSummary';
import { Card } from '../Card';

export const ProductCard = ({
  product: { id: productId, name, deliveryInfo, origin, slug, variants },
}) => {
  const { push } = useHistory();
  const { user: authUser } = useAuth();
  const { id: netlifyId } = authUser || {};

  const [getUserOrders, { data: { allUsers } = {} }] = useLazyQuery(GET_USER, {
    variables: { netlifyId },
  });

  useEffect(() => {
    if (netlifyId) getUserOrders();
  }, [netlifyId, getUserOrders]);

  const [{ orders = [] } = {}] = allUsers || [];
  const { orderItems: allOrderItems = [] } =
    orders.find(({ submitted }) => !submitted) || {};
  const orderItems = allOrderItems.filter(
    ({ productVariant: { product: { id: orderItemProductId } = {} } = {} }) =>
      orderItemProductId === productId,
  );

  const [productVariantsVisible, setProductVariantsVisible] = useState(null);

  useEffect(() => {
    if (!!orderItems.length && productVariantsVisible === null)
      setProductVariantsVisible(true);
  }, [orderItems, productVariantsVisible]);

  // const showProductVariants = () => setProductVariantsVisible(true);
  // const hideProductVariants = () => setProductVariantsVisible(false);

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

  return (
    <Card>
      <Styled.Content>
        <Styled.Header>
          <Styled.Name>{name}</Styled.Name>
          <Styled.Icon
            onClick={() => push(`/products/${slug}`)}
            path={mdiInformationOutline}
            size={0.8}
          />
        </Styled.Header>
        <Styled.Info>
          {productVariantsVisible ? (
            deliveryInfo || defaultDeliveryInfo
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
        {variants.map(variant => (
          <ProductVariant key={variant.id} variant={variant} />
        ))}
      </div>

      <Styled.Buttons>
        {!!orderItems.length ? (
          <ProductCardOrderSummary orderItems={orderItems} />
        ) : null}
      </Styled.Buttons>
    </Card>
  );
};
