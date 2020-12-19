import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Icon from '@mdi/react';
import { mdiInformationOutline, mdiMapMarker } from '@mdi/js';

import { getUnsubmittedOrderFromUser } from '../../helpers';
import * as Styled from './ProductCard.styled';
import { GET_AUTHENTICATED_USER } from './ProductCard.gql';
import { ProductVariant } from './ProductVariant';
import { ProductCardOrderSummary } from './ProductCardOrderSummary';
import { Card } from '../Card';

export const ProductCard = ({
  product: { id: productId, name, deliveryInfo, origin, slug, variants },
}) => {
  const { push } = useHistory();

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

  return (
    <Card>
      <Styled.Content>
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
