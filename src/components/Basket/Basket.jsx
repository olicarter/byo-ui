import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import uniqWith from 'lodash.uniqwith';

import { useAuth } from '../../contexts';
import { GET_ORDER_ITEMS_QUERY } from './Basket.gql';
import * as Styled from './Basket.styled';
import { Grid } from '../Grid';
import { PageHeader } from '../PageHeader';
import { ProductCard } from '../ProductCard';
import { SubTitle, Title } from '../Typography';

export const Basket = () => {
  const { user } = useAuth();
  const { id: netlifyId } = user || {};

  const [getUserOrders, { data: { allUsers } = {} }] = useLazyQuery(
    GET_ORDER_ITEMS_QUERY,
    {
      variables: { netlifyId },
    },
  );

  useEffect(() => {
    if (netlifyId) getUserOrders();
  }, [netlifyId, getUserOrders]);

  const [{ orders = [] } = {}] = allUsers || [];
  const { orderItems = [] } = orders.find(({ paid }) => !paid) || {};

  const { sum = 0 } = orderItems.reduce(
    (prevVal, currVal) => ({
      ...prevVal,
      sum:
        prevVal.sum +
        currVal.quantity * Number(currVal.productVariant.incrementPrice),
    }),
    { productVariant: { incrementPrice: 0 }, sum: 0, quantity: 0 },
  );

  const { totalContainerPrice = 0 } = orderItems.reduce(
    (prevVal, currVal) => {
      if (currVal.productVariant.container)
        return {
          ...prevVal,
          totalContainerPrice:
            prevVal.totalContainerPrice +
            currVal.quantity * Number(currVal.productVariant.container.price),
        };
      else return prevVal;
    },
    {
      productVariant: { container: { price: 0 } },
      totalContainerPrice: 0,
      quantity: 0,
    },
  );

  const orderItemProducts = uniqWith(
    orderItems,
    (a, b) => a.productVariant.product.id === b.productVariant.product.id,
  );

  return (
    <>
      <PageHeader>
        <Title>Basket</Title>
        <SubTitle>
          Total £{+parseFloat(sum).toFixed(2)}{' '}
          {totalContainerPrice ? (
            <Styled.TotalContainerPrice>
              + £{+parseFloat(totalContainerPrice).toFixed(2)}
            </Styled.TotalContainerPrice>
          ) : null}
        </SubTitle>
      </PageHeader>
      <Grid>
        {orderItemProducts.map(({ id, productVariant: { product } = {} }) => (
          <ProductCard key={id} product={product} />
        ))}
      </Grid>
    </>
  );
};
