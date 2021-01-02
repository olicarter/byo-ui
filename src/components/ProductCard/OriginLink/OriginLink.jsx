import React from 'react';
import { useLocation } from 'react-router-dom';
import { parse, stringify } from 'qs';
import slugify from 'slugify';

import * as Styled from './OriginLink.styled';

export const OriginLink = ({ origin }) => {
  const { pathname, search } = useLocation();

  const { origin: originQuerySlug, ...restQuery } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const slug = slugify(origin || '', { lower: true });

  return (
    <Styled.OriginLink
      as={origin ? undefined : 'span'}
      selected={originQuerySlug === slug}
      to={{
        pathname,
        search: stringify(
          { ...restQuery, origin: slug },
          { arrayFormat: 'brackets', encode: false },
        ),
      }}
    >
      {origin}
    </Styled.OriginLink>
  );
};
