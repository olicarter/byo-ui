import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_CATEGORIES_QUERY } from './CategoryBar.gql';
import * as Styled from './CategoryBar.styled';

export const CategoryBar = () => {
  const { categorySlug } = useParams();
  const { search } = useLocation();

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
              selected={categorySlug === 'all'}
              to={`/categories/all${search}`}
            >
              all
            </Styled.Tag>
          </Styled.NavItem>
          {allCategories.map(({ id, name, slug }) => (
            <Styled.NavItem key={id}>
              <Styled.Tag
                selected={categorySlug === slug}
                to={`/categories/${slug}${search}`}
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
