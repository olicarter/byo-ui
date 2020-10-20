import React from 'react';

import * as Styled from './Select.styled';

export const Select = ({ children, loading, onChange, value }) => (
  <Styled.SelectWrapper>
    {loading ? (
      <span>{loading}</span>
    ) : (
      <Styled.Select onChange={onChange} value={value}>
        {children}
      </Styled.Select>
    )}
  </Styled.SelectWrapper>
);
