import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { parse, stringify } from 'qs';
import slugify from 'slugify';

import { Bar } from '@components/Bar';

import { GET_ALL_PRODUCTS } from './OriginsBar.gql';
import * as Styled from './OriginsBar.styled';

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
        <Styled.NavItem>
          <Styled.Tag as="span">loading origins...</Styled.Tag>
        </Styled.NavItem>
      ) : (
        <>
          <Styled.NavItem>
            <Styled.Tag as="span">origins</Styled.Tag>
          </Styled.NavItem>

          {originQuery ? (
            <Styled.NavItem>
              <Styled.Tag
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
              </Styled.Tag>
            </Styled.NavItem>
          ) : null}

          {origins.map(origin => (
            <Styled.NavItem key={origin}>
              <Styled.Tag
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
              </Styled.Tag>
            </Styled.NavItem>
          ))}
        </>
      )}
    </Bar>
  );
};
