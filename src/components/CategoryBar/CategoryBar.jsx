import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { parse, stringify } from 'qs';

import { GET_CATEGORIES_QUERY } from './CategoryBar.gql';
import * as Styled from './CategoryBar.styled';
import { Bar } from '../Bar';

export const CategoryBar = () => {
  const { pathname, search } = useLocation();

  const { category, tags = [] } = parse(search, { ignoreQueryPrefix: true });

  const { data: { allCategories = [] } = {}, loading } = useQuery(
    GET_CATEGORIES_QUERY,
  );

  return (
    <Bar>
      {loading ? (
        <Styled.NavItem>
          <Styled.Tag as="span">loading categories</Styled.Tag>
        </Styled.NavItem>
      ) : (
        <>
          <Styled.NavItem>
            <Styled.Tag as="span">categories</Styled.Tag>
          </Styled.NavItem>
          <Styled.NavItem>
            <Styled.Tag
              selected={!category}
              to={{
                pathname,
                search: stringify(
                  {
                    tags,
                  },
                  { arrayFormat: 'brackets', encode: false },
                ),
              }}
            >
              all
            </Styled.Tag>
          </Styled.NavItem>
          {allCategories.map(({ id, name, slug }) => (
            <Styled.NavItem key={id}>
              <Styled.Tag
                selected={category === slug}
                to={{
                  pathname,
                  search: stringify(
                    {
                      category: slug,
                      tags,
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
