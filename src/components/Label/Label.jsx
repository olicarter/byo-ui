import React from 'react';

import * as Styled from './Label.styled';

export const Label = ({ children, color = 'black' }) => (
  <Styled.Label color={color}>{children}</Styled.Label>
);
