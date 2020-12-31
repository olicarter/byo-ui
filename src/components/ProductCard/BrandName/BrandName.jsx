import React from 'react';
import { useLocation } from 'react-router-dom';
import { parse, stringify } from 'qs';
import { useQuery } from '@apollo/client';

import * as Styled from './BrandName.styled';
import { GET_PRODUCT_BRAND } from './BrandName.gql';

export const BrandName = ({ productId }) => {
  const { pathname, search } = useLocation();

  const { brand: brandQuerySlug, ...restQuery } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const { data: { Product } = {} } = useQuery(GET_PRODUCT_BRAND, {
    fetchPolicy: 'cache-only',
    variables: { id: productId },
  });

  let { brand } = Product || {};

  if (brand === null) brand = { name: 'Unbranded', slug: 'unbranded' };

  const { name = '-', slug } = brand || {};

  return (
    <Styled.Brand
      selected={brandQuerySlug === slug}
      to={{
        pathname,
        search: stringify(
          {
            ...restQuery,
            brand: slug,
          },
          { arrayFormat: 'brackets', encode: false },
        ),
      }}
    >
      {name}
    </Styled.Brand>
  );
};
