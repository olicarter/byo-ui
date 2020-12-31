import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { parse, stringify } from 'qs';
import { v4 as uuid } from 'uuid';

import { Bar } from '@components/Bar';

import { GET_ALL_BRANDS } from './BrandBar.gql';
import * as Styled from './BrandBar.styled';

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
        <Styled.NavItem>
          <Styled.Tag as="span">loading brands...</Styled.Tag>
        </Styled.NavItem>
      ) : (
        <>
          <Styled.NavItem>
            <Styled.Tag as="span">brands</Styled.Tag>
          </Styled.NavItem>

          {brand ? (
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

          {brands.map(({ id, name, slug }) => (
            <Styled.NavItem key={id}>
              <Styled.Tag
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
              </Styled.Tag>
            </Styled.NavItem>
          ))}
        </>
      )}
    </Bar>
  );
};
