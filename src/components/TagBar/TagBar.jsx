import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_TAGS_QUERY } from './TagBar.queries';
import * as Styled from './TagBar.styled';

export const TagBar = () => {
  const { data: { tags = [] } = {} } = useQuery(GET_TAGS_QUERY);

  return (
    <Styled.TagBar className="TagBar">
      <Styled.Nav>
        <Styled.NavItems>
          <Styled.NavItem>
            <Styled.Tag as="span">tags</Styled.Tag>
          </Styled.NavItem>
          <Styled.NavItem>
            <Styled.Tag to="/products/all">all</Styled.Tag>
          </Styled.NavItem>
          {tags.map(({ id, name, slug }) => (
            <Styled.NavItem key={id}>
              <Styled.Tag to={`/products/${slug}`}>
                {name.toLowerCase()}
              </Styled.Tag>
            </Styled.NavItem>
          ))}
        </Styled.NavItems>
      </Styled.Nav>
    </Styled.TagBar>
  );
};
