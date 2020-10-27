import React from 'react';

import * as Styled from './Label.styled';

export const Label = ({ children, color = 'black', large = false }) => (
  <Styled.Label color={color} large={large}>
    {children}
  </Styled.Label>
);
