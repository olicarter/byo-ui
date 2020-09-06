import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_ALL_PRODUCTS_QUERY, GET_TAG_PRODUCTS_QUERY } from './Products.gql';
import * as Styled from './Products.styled';
import { Product } from '../Product';

export const Products = () => {
  const { tagSlug } = useParams();

  const { data: { products = [] } = {} } = useQuery(
    tagSlug === 'all' ? GET_ALL_PRODUCTS_QUERY : GET_TAG_PRODUCTS_QUERY,
    {
      variables: { tagSlug },
    },
  );

  return (
    <Styled.Products className="Products">
      {products.map(({ id }) => (
        <Product key={id} id={id} />
      ))}
    </Styled.Products>
  );
};
