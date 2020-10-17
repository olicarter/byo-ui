import React from 'react';

import * as Styled from './SubTitle.styled';

export const SubTitle = ({ children, margin = '1rem 0' }) => (
  <Styled.SubTitle margin={margin}>{children}</Styled.SubTitle>
);
