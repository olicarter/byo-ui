import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { parse, stringify } from 'qs';

import { Bar, BarLink, BarSpan } from '@components/Bar';

import { GET_TAGS_QUERY } from './TagBar.gql';

export const TagBar = () => {
  const { pathname, search } = useLocation();

  const { data: { allTags = [] } = {}, loading } = useQuery(GET_TAGS_QUERY);

  const { tags: queryTags = [], ...restQuery } = parse(search, {
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
      <BarSpan>{loading ? 'loading tags' : 'tags'}</BarSpan>

      {queryTags.length ? (
        <BarLink
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
        </BarLink>
      ) : null}

      {allTags.map(({ id, name, slug }) => (
        <BarLink
          key={id}
          selected={queryTags.includes(slug)}
          to={{
            pathname,
            search: stringify(
              {
                ...restQuery,
                tags: getTags(slug),
              },
              { arrayFormat: 'brackets', encode: false },
            ),
          }}
        >
          {name.toLowerCase()}
        </BarLink>
      ))}
    </Bar>
  );
};
