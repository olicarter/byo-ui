import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_ALL_PRODUCTS_QUERY, GET_TAG_PRODUCTS_QUERY } from './Products.gql';
import { Grid } from '../Grid';
import { ProductCard } from '../ProductCard';

export const Products = () => {
  const { tagSlug } = useParams();

  const { data: { allProducts = [] } = {} } = useQuery(
    tagSlug === 'all' ? GET_ALL_PRODUCTS_QUERY : GET_TAG_PRODUCTS_QUERY,
    {
      variables: { tagSlug },
    },
  );

  return (
    <Grid>
      {allProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};
