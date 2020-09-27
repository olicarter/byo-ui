import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import uniqWith from 'lodash.uniqwith';

import { useAuth } from '../../contexts';
import { GET_ORDER_ITEMS_QUERY } from './Basket.gql';
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

  const { sum } = orderItems.length
    ? orderItems.reduce((prevVal, currVal) => ({
        ...prevVal,
        sum:
          prevVal.quantity * prevVal.productVariant.incrementPrice +
          currVal.quantity * currVal.productVariant.incrementPrice,
      }))
    : { sum: 0 };

  const orderItemProducts = uniqWith(
    orderItems,
    (a, b) => a.productVariant.product.id === b.productVariant.product.id,
  );

  return (
    <>
      <PageHeader>
        <Title>Basket</Title>
        <SubTitle>Total £{sum.toFixed(2)}</SubTitle>
      </PageHeader>
      <Grid>
        {orderItemProducts.map(({ id, productVariant: { product } = {} }) => (
          <ProductCard key={id} product={product} />
        ))}
      </Grid>
    </>
  );
};
