import React from 'react';

import * as Styled from './Select.styled';

export const Select = ({ children, onChange, value }) => (
  <Styled.Select onChange={onChange} value={value}>
    {children}
  </Styled.Select>
);
