import React from 'react';

import * as Styled from './SubTitle.styled';

export const SubTitle = ({ children, color = 'black', margin = '1rem 0' }) => (
  <Styled.SubTitle color={color} margin={margin}>
    {children}
  </Styled.SubTitle>
);
