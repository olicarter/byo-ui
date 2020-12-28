import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { stringify, parse } from 'qs';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

import { useDebounce } from '@hooks';
import * as Styled from './SearchBar.styled';

export const SearchBar = () => {
  const { push } = useHistory();
  const { search } = useLocation();

  const [value, setValue] = useState();

  const { search: searchQuery, ...restQuery } = parse(search, {
    ignoreQueryPrefix: true,
  });

  useDebounce(() => {
    push({
      search: stringify(
        {
          ...restQuery,
          search: value || undefined,
        },
        { arrayFormat: 'brackets', encode: false },
      ),
    });
  }, 1000);

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  return (
    <Styled.SearchBar>
      <Styled.IconWrapper>
        <Icon path={mdiMagnify} size={1} />
      </Styled.IconWrapper>
      <Styled.Input
        autoFocus
        defaultValue={searchQuery}
        onChange={handleChange}
        placeholder="search..."
      />
    </Styled.SearchBar>
  );
};
