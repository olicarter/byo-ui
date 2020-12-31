import React, { useEffect, useMemo } from 'react';
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

  const {
    brand: queryBrandSlug,
    category: queryCategorySlug,
    search: querySearch,
    tags: queryTags,
  } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const stringifiedQueryTags = JSON.stringify(queryTags);

  const hasFilter =
    queryBrandSlug ||
    queryCategorySlug ||
    (Array.isArray(queryTags) && queryTags.length);

  const brandFilter = useMemo(
    () => (queryBrandSlug ? [{ brand: { slug: queryBrandSlug } }] : []),
    [queryBrandSlug],
  );

  const categoryFilter = useMemo(
    () =>
      queryCategorySlug ? [{ category: { slug: queryCategorySlug } }] : [],
    [queryCategorySlug],
  );

  const tagsFilter = useMemo(
    () =>
      Array.isArray(queryTags) && queryTags.length
        ? queryTags.map(slug => ({ tags_some: { slug } }))
        : [],
    [queryTags],
  );

  const filter = useMemo(
    () =>
      hasFilter
        ? { where: { AND: [...brandFilter, ...categoryFilter, ...tagsFilter] } }
        : {},
    [hasFilter, brandFilter, categoryFilter, tagsFilter],
  );

  const { data: { allProducts = [] } = {}, refetch } = useQuery(GET_PRODUCTS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      search: querySearch,
      ...filter,
    },
  });

  useEffect(() => {
    if (refetch)
      refetch({
        search: querySearch,
        ...filter,
      });
  }, [
    filter,
    stringifiedQueryTags,
    queryCategorySlug,
    querySearch,
    refetch,
    tagsFilter,
  ]);

  return (
    <>
      <Grid>
        {allProducts.map(product => (
          <Sentry.ErrorBoundary>
            <ProductCard key={product.id} {...product} />
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
