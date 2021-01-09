import React from 'react';
import { useLocation } from 'react-router-dom';
import { parse, stringify } from 'qs';

import * as Styled from './ProductVariantTagList.styled';

export const ProductVariantTagList = ({
  productTags = [],
  productVariantTags = [],
}) => {
  const { pathname, search } = useLocation();

  const { tags: queryTags = [], ...restQuery } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const tags = productVariantTags.filter(
    tag => !productTags.find(productTag => productTag.id === tag.id),
  );

  return (
    <Styled.TagList>
      {tags.map(({ slug }) => (
        <Styled.Tag
          className="Tag"
          data-slug={slug}
          key={slug}
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
      ))}
    </Styled.TagList>
  );
};
