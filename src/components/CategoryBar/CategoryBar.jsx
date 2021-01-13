import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { parse, stringify } from 'qs';

import { Bar, BarLink, BarSpan } from '@components/Bar';

import { GET_CATEGORIES_QUERY } from './CategoryBar.gql';

export const CategoryBar = () => {
  const { pathname, search } = useLocation();

  const { category, ...restQuery } = parse(search, { ignoreQueryPrefix: true });

  const { data: { allCategories = [] } = {}, loading } = useQuery(
    GET_CATEGORIES_QUERY,
  );

  return (
    <Bar>
      {loading ? (
        <BarSpan>loading categories</BarSpan>
      ) : (
        <>
          <BarSpan>categories</BarSpan>
          {/* <BarLink
            selected={!category}
            to={{
              pathname,
              search: stringify(restQuery, {
                arrayFormat: 'brackets',
                encode: false,
              }),
            }}
          >
            all
          </BarLink> */}
          {allCategories.map(({ id, name, slug }) => (
            <BarLink
              key={id}
              selected={category === slug}
              to={{
                pathname,
                search: stringify(
                  {
                    ...restQuery,
                    category: slug,
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
