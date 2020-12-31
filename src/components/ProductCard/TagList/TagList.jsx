import React from 'react';
import { useLocation } from 'react-router-dom';
import { parse, stringify } from 'qs';
import { useQuery } from '@apollo/client';

import { GET_PRODUCT_TAGS } from './TagList.gql';
import * as Styled from './TagList.styled';

export const TagList = ({ productId }) => {
  const { pathname, search } = useLocation();

  const { tags: queryTags = [], ...restQuery } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const { data: { Product } = {} } = useQuery(GET_PRODUCT_TAGS, {
    fetchPolicy: 'cache-only',
    variables: { id: productId },
  });

  const { tags = [] } = Product || {};

  return (
    <Styled.TagList>
      {tags.map(({ abbreviation, slug }) =>
        abbreviation ? (
          <Styled.Tag
            className="Tag"
            data-abbreviation={abbreviation}
            data-slug={slug}
            selected={queryTags.includes(slug)}
            to={{
              pathname,
              search: stringify(
                {
                  ...restQuery,
                  tags: [slug],
                },
                { arrayFormat: 'brackets', encode: false },
              ),
            }}
          />
        ) : null,
      )}
    </Styled.TagList>
  );
};
