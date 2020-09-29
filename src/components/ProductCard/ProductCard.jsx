import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useAuth } from '../../contexts';
import * as Styled from './ProductCard.styled';
import { GET_USER } from './ProductCard.gql';

import { ProductVariant } from './ProductVariant';
import { ProductCardOrderSummary } from './ProductCardOrderSummary';
import { Button } from '../Button';

export const ProductCard = ({
  product: { id: productId, description, name, variants },
}) => {
  const { user: authUser } = useAuth();
  const { id: netlifyId } = authUser || {};

  const [getUserOrders, { data: { allUsers } = {} }] = useLazyQuery(GET_USER, {
    variables: { netlifyId },
  });

  useEffect(() => {
    if (netlifyId) getUserOrders();
  }, [netlifyId, getUserOrders]);

  const [{ orders = [] } = {}] = allUsers || [];
  const unpaidOrder = orders.find(({ paid }) => !paid) || {};
  const { orderItems: allOrderItems = [] } = unpaidOrder;
  const orderItems = allOrderItems.filter(
    ({ productVariant: { product: { id: orderItemProductId } = {} } = {} }) =>
      orderItemProductId === productId,
  );

  const [productVariantsVisible, setProductVariantsVisible] = useState(null);

  useEffect(() => {
    if (!!orderItems.length && productVariantsVisible === null)
      setProductVariantsVisible(true);
  }, [orderItems, productVariantsVisible]);

  const showProductVariants = () => setProductVariantsVisible(true);
  const hideProductVariants = () => setProductVariantsVisible(false);

  const purchaseInfo = (() => {
    console.log(variants);
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
    <Styled.ProductCard className="Product">
      <Styled.Content>
        <Styled.Name>{name}</Styled.Name>
        <Styled.Info>
          {productVariantsVisible ? purchaseInfo : description}
        </Styled.Info>
      </Styled.Content>

      {productVariantsVisible &&
        variants.map(variant => (
          <ProductVariant key={variant.id} variant={variant} />
        ))}

      <Styled.Buttons>
        {productVariantsVisible ? (
          <>
            {!!orderItems.length ? (
              <ProductCardOrderSummary orderItems={orderItems} />
            ) : (
              <Button backgroundColor="red" onClick={hideProductVariants}>
                Cancel
              </Button>
            )}
          </>
        ) : (
          <Button onClick={showProductVariants}>Add to order</Button>
        )}
      </Styled.Buttons>
    </Styled.ProductCard>
  );
};
