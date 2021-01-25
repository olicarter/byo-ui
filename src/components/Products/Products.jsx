import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { parse } from 'qs';
import * as Sentry from '@sentry/react';

import { FloatingButton } from '@components/FloatingButton';
import { Grid } from '@components/Grid';
import { ProductCard } from '@components/ProductCard';
import { SubTitle } from '@components/Typography';
import { useAuth } from '@contexts';

import { GET_PRODUCTS, GET_PRODUCTS_COUNT } from './Products.gql';

export const Products = () => {
  const { push } = useHistory();
  const { search } = useLocation();
  const { isAuthenticated } = useAuth();

  const {
    brand: queryBrandSlug,
    category: queryCategorySlug,
    origin: queryOriginSlug,
    search: querySearch,
    tags: queryTags,
  } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const hasFilter =
    queryBrandSlug ||
    queryCategorySlug ||
    queryOriginSlug ||
    (Array.isArray(queryTags) && queryTags.length);

  const brandFilter = useMemo(
    () =>
      queryBrandSlug
        ? [
            queryBrandSlug === 'unbranded'
              ? { brand_is_null: true }
              : { brand: { slug: queryBrandSlug } },
          ]
        : [],
    [queryBrandSlug],
  );

  const categoryFilter = useMemo(
    () =>
      queryCategorySlug ? [{ category: { slug: queryCategorySlug } }] : [],
    [queryCategorySlug],
  );

  const originFilter = useMemo(
    () =>
      queryOriginSlug ? [{ origin_i: queryOriginSlug.replace('-', ' ') }] : [],
    [queryOriginSlug],
  );

  const tagsFilter = useMemo(
    () =>
      Array.isArray(queryTags) && queryTags.length
        ? [
            {
              OR: [
                ...queryTags.map(slug => ({ tags_some: { slug } })),
                ...queryTags.map(slug => ({
                  variants_some: { tags_some: { slug } },
                })),
              ],
            },
          ]
        : [],
    [queryTags],
  );

  const filter = useMemo(
    () =>
      hasFilter
        ? {
            where: {
              AND: [
                ...brandFilter,
                ...categoryFilter,
                ...originFilter,
                ...tagsFilter,
              ],
            },
          }
        : {},
    [hasFilter, brandFilter, categoryFilter, originFilter, tagsFilter],
  );

  const { data: { _allProductsMeta: { count } = {} } = {} } = useQuery(
    GET_PRODUCTS_COUNT,
    {
      variables: { search: querySearch, ...filter },
    },
  );

  const { data: { allProducts = [] } = {}, loading } = useQuery(GET_PRODUCTS, {
    returnPartialData: true,
    variables: { search: querySearch, ...filter },
  });

  return (
    <>
      {loading ? (
        <SubTitle color="grey">
          {count
            ? `Loading ${count} product${count === 1 ? '' : 's'}...`
            : 'Loading'}
        </SubTitle>
      ) : null}

      <Grid>
        {allProducts.map(product => (
          <Sentry.ErrorBoundary key={product.id}>
            <ProductCard product={product} />
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
