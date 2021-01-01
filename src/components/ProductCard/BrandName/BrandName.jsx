import React from 'react';
import { useLocation } from 'react-router-dom';
import { parse, stringify } from 'qs';

import * as Styled from './BrandName.styled';

export const BrandName = ({ brand }) => {
  const { pathname, search } = useLocation();

  const { brand: brandQuerySlug, ...restQuery } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const safeBrand =
    brand === null ? { name: 'Unbranded', slug: 'unbranded' } : brand;

  const { name, slug } = safeBrand || {};

  return (
    <Styled.Brand
      selected={name && brandQuerySlug === slug}
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
      {name || '-'}
    </Styled.Brand>
  );
};
