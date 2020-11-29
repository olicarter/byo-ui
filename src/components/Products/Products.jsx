import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { parse } from 'qs';
import * as Sentry from '@sentry/react';

import { useAuth } from '../../contexts';
import { GET_PRODUCTS } from './Products.gql';
import { FloatingButton } from '../FloatingButton';
import { Grid } from '../Grid';
import { ProductCard } from '../ProductCard';

export const Products = () => {
  const { push } = useHistory();
  const { search } = useLocation();
  const { isAuthenticated } = useAuth();

  const { data: { allProducts = [] } = {} } = useQuery(GET_PRODUCTS);

  const { category: queryCategorySlug, tags: queryTags = [] } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const filteredProducts = allProducts
    .filter(
      ({ category: { slug: categorySlug } = {}, tags = [] }) =>
        (!queryCategorySlug || queryCategorySlug === categorySlug) &&
        (queryTags.length
          ? queryTags.every(tag =>
              tags.find(({ slug: tagSlug }) => tagSlug === tag),
            )
          : true),
    )
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <>
      <Grid>
        {filteredProducts.map(product => (
          <Sentry.ErrorBoundary>
            <ProductCard key={product.id} product={product} />
          </Sentry.ErrorBoundary>
        ))}
      </Grid>
      {isAuthenticated ? (
        <FloatingButton onClick={() => push('/basket')}>
          View basket
        </FloatingButton>
      ) : (
        <FloatingButton onClick={() => push('/login?from=/products')}>
          Log in to order
        </FloatingButton>
      )}
    </>
  );
};
