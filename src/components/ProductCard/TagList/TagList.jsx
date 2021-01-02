import React from 'react';
import { useLocation } from 'react-router-dom';
import { parse, stringify } from 'qs';

import * as Styled from './TagList.styled';

export const TagList = ({ tags }) => {
  const { pathname, search } = useLocation();

  const { tags: queryTags = [], ...restQuery } = parse(search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Styled.TagList>
      {Array.isArray(tags) ? (
        tags.map(({ abbreviation, id, slug }) =>
          abbreviation ? (
            <Styled.Tag
              className="Tag"
              data-abbreviation={abbreviation}
              data-slug={slug}
              key={id}
              selected={queryTags.includes(slug)}
              to={{
                pathname,
                search: stringify(
                  { ...restQuery, tags: [slug] },
                  { arrayFormat: 'brackets', encode: false },
                ),
              }}
            />
          ) : null,
        )
      ) : (
        <Styled.Tag as="span">-</Styled.Tag>
      )}
    </Styled.TagList>
  );
};
