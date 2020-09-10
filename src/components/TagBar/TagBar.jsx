import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_TAGS_QUERY } from './TagBar.gql';
import * as Styled from './TagBar.styled';

export const TagBar = () => {
  const { tagSlug } = useParams();

  const { data: { allTags = [] } = {} } = useQuery(GET_TAGS_QUERY);

  return (
    <Styled.TagBar className="TagBar">
      <Styled.Nav>
        <Styled.NavItems>
          <Styled.NavItem>
            <Styled.Tag as="span">tags</Styled.Tag>
          </Styled.NavItem>
          <Styled.NavItem>
            <Styled.Tag selected={tagSlug === 'all'} to="/products/all">
              all
            </Styled.Tag>
          </Styled.NavItem>
          {allTags.map(({ id, name, slug }) => (
            <Styled.NavItem key={id}>
              <Styled.Tag selected={tagSlug === slug} to={`/products/${slug}`}>
                {name.toLowerCase()}
              </Styled.Tag>
            </Styled.NavItem>
          ))}
        </Styled.NavItems>
      </Styled.Nav>
    </Styled.TagBar>
  );
};
