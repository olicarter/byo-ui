import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_PRODUCTS_BY_SLUG } from './Product.gql';
import * as Styled from './Product.styled';
import { Title, SubTitle } from '../Typography';

export const Product = () => {
  const { productSlug } = useParams();

  const {
    data: {
      allProducts: [
        {
          category: { name: categoryName } = {},
          name: productName,
          origin,
        } = {},
      ] = [],
    } = {},
  } = useQuery(GET_PRODUCTS_BY_SLUG, {
    variables: { slug: productSlug },
  });

  return (
    <Styled.Product>
      <Title>{productName}</Title>
      {/* <SubTitle>{categoryName}</SubTitle> */}
      {origin ? <p>Country of origin: {origin}</p> : null}
    </Styled.Product>
  );
};
