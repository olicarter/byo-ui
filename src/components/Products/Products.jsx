import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';

import { useAuth } from '../../contexts';
import { GET_ALL_PRODUCTS_QUERY, GET_AUTH_DATA } from './Products.gql';
import { Grid } from '../Grid';
import { ProductCard } from '../ProductCard';

export const Products = () => {
  const { tagSlug } = useParams();
  const { user } = useAuth();
  const { id: netlifyId } = user || {};

  const { data: { allProducts = [] } = {} } = useQuery(GET_ALL_PRODUCTS_QUERY, {
    variables: { tagSlug },
  });

  const [getUserUnpaidOrder] = useLazyQuery(GET_AUTH_DATA, {
    variables: { netlifyId },
  });

  useEffect(() => {
    if (netlifyId) getUserUnpaidOrder();
  }, [netlifyId]);

  const filteredProducts =
    tagSlug === 'all'
      ? allProducts
      : allProducts.filter(({ tags = [] }) =>
          tags.find(({ slug }) => slug === tagSlug),
        );

  return (
    <Grid>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};
