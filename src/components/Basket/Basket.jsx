import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import uniqWith from 'lodash.uniqwith';
import * as Sentry from '@sentry/react';

import { getUnsubmittedOrderFromUser } from '@helpers';
import { BasketTotal } from '@components/BasketTotal';
import { CallToActionButton } from '@components/CallToActionButton';
import { Grid } from '@components/Grid';
import { ProductCard } from '@components/ProductCard';

import { GET_SETTINGS, GET_AUTHENTICATED_USER } from './Basket.gql';

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

  const basketTotal = BasketTotal();
  const meetsMinOrderValue = basketTotal >= minOrderValue;

  return (
    <>
      <Grid>
        {orderItemProducts.map(({ id, productVariant: { product } = {} }) => (
          <Sentry.ErrorBoundary key={product.id}>
            <ProductCard key={id} product={product} showOnlyVariantsInOrder />
          </Sentry.ErrorBoundary>
        ))}
      </Grid>
      <CallToActionButton
        disabled={!meetsMinOrderValue}
        onClick={() => push('/checkout')}
      >
        Continue to checkout
      </CallToActionButton>
    </>
  );
};
