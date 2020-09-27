import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { parse, stringify } from 'qs';

import { GET_CATEGORIES_QUERY } from './CategoryBar.gql';
import * as Styled from './CategoryBar.styled';

export const CategoryBar = () => {
  const { pathname, search } = useLocation();

  const { category, tags = [] } = parse(search, { ignoreQueryPrefix: true });

  const { data: { allCategories = [] } = {} } = useQuery(GET_CATEGORIES_QUERY);

  return (
    <Styled.CategoryBar>
      <Styled.Nav>
        <Styled.NavItems>
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
        </Styled.NavItems>
      </Styled.Nav>
    </Styled.CategoryBar>
  );
};
