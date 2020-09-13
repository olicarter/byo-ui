import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useAuth } from '../../contexts';
import { GET_ORDER_ITEMS_QUERY } from './Basket.gql';
import { Grid } from '../Grid';
import { ProductCard } from '../ProductCard';

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

  const [{ orders: [{ orderItems = [] } = {}] = [] } = {}] = allUsers || [];

  return (
    <Grid>
      {orderItems.map(({ id, product }) => (
        <ProductCard key={id} product={product} />
      ))}
    </Grid>
  );
};
