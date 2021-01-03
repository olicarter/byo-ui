import React from 'react';
import { useLocation } from 'react-router-dom';
import { parse, stringify } from 'qs';

import * as Styled from './BrandLink.styled';

export const BrandLink = ({ brand }) => {
  const { search } = useLocation();

  const { brand: brandQuerySlug, ...restQuery } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const safeBrand =
    brand === null ? { name: 'Unbranded', slug: 'unbranded' } : brand;

  const { name, slug } = safeBrand || {};

  return (
    <Styled.BrandLink
      loading={!name}
      selected={name && brandQuerySlug === slug}
      to={{
        pathname: '/products',
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
    </Styled.BrandLink>
  );
};
