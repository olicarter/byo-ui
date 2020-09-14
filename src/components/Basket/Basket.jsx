import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useAuth } from '../../contexts';
import { GET_ORDER_ITEMS_QUERY } from './Basket.gql';
import { Grid } from '../Grid';
import { PageHeader } from '../PageHeader';
import { ProductCard } from '../ProductCard';
import { SubTitle, Title } from '../Typography';

export const Basket = () => {
  const { user } = useAuth();
  const { id: netlifyId } = user || {};

  const [getOrderItems, { data: { allUsers } = {} }] = useLazyQuery(
    GET_ORDER_ITEMS_QUERY,
    {
      variables: { netlifyId },
    },
  );

  useEffect(() => {
    if (netlifyId) getOrderItems();
  }, [netlifyId]);

  const [{ orders = [] } = {}] = allUsers || [];
  const { orderItems = [] } = orders.find(({ paid }) => !paid) || {};

  const { sum } = orderItems.length
    ? orderItems.reduce((prevVal, currVal) => ({
        ...prevVal,
        sum:
          prevVal.quantity * prevVal.product.price +
          currVal.quantity * currVal.product.price,
      }))
    : { sum: 0 };
  console.log(sum);

  return (
    <>
      <PageHeader>
        <Title>Basket</Title>
        <SubTitle>Total £{sum.toFixed(2)}</SubTitle>
      </PageHeader>
      <Grid>
        {orderItems.map(({ id, product }) => (
          <ProductCard key={id} product={product} />
        ))}
      </Grid>
    </>
  );
};
