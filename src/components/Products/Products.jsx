import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { parse } from 'qs';
import * as Sentry from '@sentry/react';
import Fuse from 'fuse.js';

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

  const {
    category: queryCategorySlug,
    search: querySearch,
    tags: queryTags = [],
  } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const filteredProducts = allProducts
    .filter(({ category: { slug: categorySlug } = {}, slug, tags = [] }) => {
      const categoryMatches =
        !queryCategorySlug || queryCategorySlug === categorySlug;

      const tagMatches = queryTags.length
        ? queryTags.every(tag => {
            return tags.find(({ slug: tagSlug }) => tagSlug === tag);
          })
        : true;

      return categoryMatches && tagMatches;
    })
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const fuse = new Fuse(filteredProducts, {
    keys: ['name'],
    threshold: 0.4,
  });

  const searchedAndFilteredProducts = querySearch
    ? fuse.search(querySearch).map(({ item }) => item)
    : filteredProducts;

  return (
    <>
      <Grid>
        {searchedAndFilteredProducts.map(product => (
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
