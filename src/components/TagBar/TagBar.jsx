import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { parse, stringify } from 'qs';

import { GET_TAGS_QUERY } from './TagBar.gql';
import * as Styled from './TagBar.styled';

export const TagBar = () => {
  const { tagSlug } = useParams();
  const { pathname, search } = useLocation();

  const { data: { allTags = [] } = {} } = useQuery(GET_TAGS_QUERY);

  const { tags: queryTags = [] } = parse(search, { ignoreQueryPrefix: true });

  const getTags = slug => {
    const selected = queryTags.includes(slug);
    const tags = selected
      ? queryTags.filter(queryTagSlug => queryTagSlug !== slug)
      : [...queryTags, slug];
    return tags;
  };

  return (
    <Styled.TagBar className="TagBar">
      <Styled.Nav>
        <Styled.NavItems>
          <Styled.NavItem>
            <Styled.Tag as="span">tags</Styled.Tag>
          </Styled.NavItem>
          {allTags.map(({ id, name, slug }) => (
            <Styled.NavItem key={id}>
              <Styled.Tag
                selected={queryTags.includes(slug)}
                to={{
                  pathname,
                  search: stringify(
                    {
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
        </Styled.NavItems>
      </Styled.Nav>
    </Styled.TagBar>
  );
};
