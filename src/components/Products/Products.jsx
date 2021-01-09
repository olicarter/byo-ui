import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import { parse } from 'qs';
import * as Sentry from '@sentry/react';

import { useAuth } from '../../contexts';
import {
  GET_PRODUCTS,
  GET_PRODUCTS_BRAND,
  GET_PRODUCTS_DETAILS,
  GET_PRODUCTS_TAGS,
  GET_PRODUCTS_VARIANTS,
} from './Products.gql';
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

  const [getProductsVariants] = useLazyQuery(GET_PRODUCTS_VARIANTS, {
    fetchPolicy: 'cache-first',
    variables: { search: querySearch, ...filter },
  });
  const [getProductsTags] = useLazyQuery(GET_PRODUCTS_TAGS, {
    fetchPolicy: 'cache-first',
    onCompleted: getProductsVariants,
    variables: { search: querySearch, ...filter },
  });
  const [getProductsBrand] = useLazyQuery(GET_PRODUCTS_BRAND, {
    fetchPolicy: 'cache-first',
    onCompleted: getProductsTags,
    variables: { search: querySearch, ...filter },
  });
  const [getProductsDetails] = useLazyQuery(GET_PRODUCTS_DETAILS, {
    fetchPolicy: 'cache-first',
    onCompleted: getProductsBrand,
    variables: { search: querySearch, ...filter },
  });
  const { data: { allProducts = [] } = {} } = useQuery(GET_PRODUCTS, {
    fetchPolicy: 'cache-only',
    onCompleted: getProductsDetails,
    returnPartialData: true,
    variables: { search: querySearch, ...filter },
  });

  return (
    <>
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
