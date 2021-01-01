import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { parse, stringify } from 'qs';
import slugify from 'slugify';

import { Bar, BarLink, BarSpan } from '@components/Bar';

import { GET_ALL_PRODUCTS } from './OriginsBar.gql';

export const OriginsBar = () => {
  const { pathname, search } = useLocation();

  const { origin: originQuery, ...restQuery } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const {
    data: { allProducts = [] } = {},
    loading,
  } = useQuery(GET_ALL_PRODUCTS, { fetchPolicy: 'cache-only' });

  const origins =
    [
      ...new Set(
        allProducts
          .filter(({ origin }) => !!origin)
          .map(({ origin }) => origin),
      ),
    ].sort((a, b) => a.localeCompare(b)) || [];

  return (
    <Bar>
      {loading ? (
        <BarSpan>loading origins...</BarSpan>
      ) : (
        <>
          <BarSpan>origins</BarSpan>

          {originQuery ? (
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

          {origins.map(origin => (
            <BarLink
              kwy={origin}
              selected={originQuery === slugify(origin, { lower: true })}
              to={{
                pathname,
                search: stringify(
                  {
                    ...restQuery,
                    ...(originQuery === slugify(origin, { lower: true })
                      ? {}
                      : { origin: slugify(origin, { lower: true }) }),
                  },
                  { arrayFormat: 'brackets', encode: false },
                ),
              }}
            >
              {origin.toLowerCase()}
            </BarLink>
          ))}
        </>
      )}
    </Bar>
  );
};
