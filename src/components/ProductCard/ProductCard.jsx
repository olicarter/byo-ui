import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import Icon from '@mdi/react';
import { mdiInformationOutline, mdiMapMarker } from '@mdi/js';

import { useAuth } from '../../contexts';
import * as Styled from './ProductCard.styled';
import { GET_USERS_BY_AUTH0_ID } from './ProductCard.gql';
import { ProductVariant } from './ProductVariant';
import { ProductCardOrderSummary } from './ProductCardOrderSummary';
import { Card } from '../Card';

export const ProductCard = ({
  product: { id: productId, name, deliveryInfo, origin, slug, variants },
}) => {
  const { push } = useHistory();
  const { user: authUser } = useAuth();
  const { sub: auth0Id } = authUser || {};

  const [getUsersByAuth0Id, { data: { allUsers } = {} }] = useLazyQuery(
    GET_USERS_BY_AUTH0_ID,
    {
      variables: { auth0Id },
    },
  );

  useEffect(() => {
    if (auth0Id) getUsersByAuth0Id();
  }, [auth0Id, getUsersByAuth0Id]);

  const [{ orders = [] } = {}] = allUsers || [];
  const { orderItems: allOrderItems = [] } =
    orders.find(({ submitted }) => !submitted) || {};
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
          {!!orderItems.length ? (
            <Styled.Origin>{deliveryInfo || defaultDeliveryInfo}</Styled.Origin>
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
