import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { parse, stringify } from 'qs';

import { GET_TAGS_QUERY } from './TagBar.gql';
import * as Styled from './TagBar.styled';
import { Bar } from '../Bar';

export const TagBar = () => {
  const { pathname, search } = useLocation();

  const { data: { allTags = [] } = {}, loading } = useQuery(GET_TAGS_QUERY);

  const { category, tags: queryTags = [] } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const getTags = slug => {
    const selected = queryTags.includes(slug);
    const tags = selected
      ? queryTags.filter(queryTagSlug => queryTagSlug !== slug)
      : [...queryTags, slug];
    return tags;
  };

  return (
    <Bar>
      <Styled.NavItem>
        <Styled.Tag as="span">{loading ? 'loading tags' : 'tags'}</Styled.Tag>
      </Styled.NavItem>
      {allTags.map(({ id, name, slug }) => (
        <Styled.NavItem key={id}>
          <Styled.Tag
            selected={queryTags.includes(slug)}
            to={{
              pathname,
              search: stringify(
                {
                  category,
                  tags: getTags(slug),
                },
                { arrayFormat: 'brackets', encode: false },
              ),
            }}
          >
            {name.toLowerCase()}
          </Styled.Tag>
        </Styled.NavItem>
      ))}
    </Bar>
  );
};
