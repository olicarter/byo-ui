import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import uniqWith from 'lodash.uniqwith';

import { getUnsubmittedOrderFromUser } from '@helpers';
import { GET_SETTINGS, GET_AUTHENTICATED_USER } from './Basket.gql';
import { BasketTotal } from '../BasketTotal';
import { FloatingButton } from '../FloatingButton';
import { Grid } from '../Grid';
import { ProductCard } from '../ProductCard';

export const Basket = () => {
  const { push } = useHistory();

  const {
    data: { allSettings: [{ minOrderValue } = {}] = [] } = {},
  } = useQuery(GET_SETTINGS);

  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const { orderItems = [] } = getUnsubmittedOrderFromUser(authenticatedUser);

  const orderItemProducts = uniqWith(
    orderItems,
    (a, b) => a.productVariant.product.id === b.productVariant.product.id,
  ).sort((a, b) =>
    a.productVariant.product.name.localeCompare(b.productVariant.product.name),
  );

  const meetsMinOrderValue = BasketTotal() >= minOrderValue;

  return (
    <>
      <Grid>
        {orderItemProducts.map(({ id, productVariant: { product } = {} }) => (
          <ProductCard key={id} {...product} />
        ))}
      </Grid>
      <FloatingButton
        disabled={!meetsMinOrderValue}
        onClick={() => push('/checkout')}
      >
        Continue to checkout
      </FloatingButton>
    </>
  );
};
