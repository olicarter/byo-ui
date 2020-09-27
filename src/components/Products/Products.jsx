import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import { parse } from 'qs';

import { useAuth } from '../../contexts';
import { GET_ALL_PRODUCTS_QUERY, GET_AUTH_DATA } from './Products.gql';
import { Grid } from '../Grid';
import { ProductCard } from '../ProductCard';

export const Products = () => {
  const { search } = useLocation();
  const { user } = useAuth();
  const { id: netlifyId } = user || {};

  const { data: { allProducts = [] } = {} } = useQuery(GET_ALL_PRODUCTS_QUERY);

  const [getUserUnpaidOrder] = useLazyQuery(GET_AUTH_DATA, {
    variables: { netlifyId },
  });

  useEffect(() => {
    if (netlifyId) getUserUnpaidOrder();
  }, [netlifyId, getUserUnpaidOrder]);

  const { category: queryCategorySlug, tags: queryTags = [] } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const filteredProducts = allProducts
    .filter(
      ({ category: { slug: categorySlug } = {}, tags = [] }) =>
        (!queryCategorySlug || queryCategorySlug === categorySlug) &&
        tags.some(({ slug: tagSlug }) =>
          queryTags.length ? queryTags.includes(tagSlug) : true,
        ),
    )
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <Grid>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};
