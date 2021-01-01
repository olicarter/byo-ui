import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { parse, stringify } from 'qs';
import { v4 as uuid } from 'uuid';

import { Bar, BarLink, BarSpan } from '@components/Bar';

import { GET_ALL_BRANDS } from './BrandBar.gql';

export const BrandBar = () => {
  const { pathname, search } = useLocation();

  const { brand, ...restQuery } = parse(search, { ignoreQueryPrefix: true });

  const { data: { allBrands = [] } = {}, loading } = useQuery(GET_ALL_BRANDS);

  const brands = [
    ...allBrands,
    { id: uuid(), name: 'Unbranded', slug: 'unbranded' },
  ].sort((a, b) => a.slug.localeCompare(b.slug));

  return (
    <Bar>
      {loading ? (
        <BarSpan>loading brands...</BarSpan>
      ) : (
        <>
          <BarSpan as="span">brands</BarSpan>

          {brand ? (
            <BarLink
              color="red"
              to={{
                pathname,
                search: stringify(restQuery, {
                  arrayFormat: 'brackets',
                  encode: false,
                }),
              }}
            >
              clear
            </BarLink>
          ) : null}

          {brands.map(({ id, name, slug }) => (
            <BarLink
              key={id}
              selected={brand === slug}
              to={{
                pathname,
                search: stringify(
                  {
                    ...restQuery,
                    ...(brand === slug ? {} : { brand: slug }),
                  },
                  { arrayFormat: 'brackets', encode: false },
                ),
              }}
            >
              {name.toLowerCase()}
            </BarLink>
          ))}
        </>
      )}
    </Bar>
  );
};
