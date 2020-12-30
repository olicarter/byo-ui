import React from 'react';

import * as Styled from './Link.styled';

export const Link = ({ bold = false, children, color = 'black', ...props }) => (
  <Styled.Link bold={bold} color={color} {...props}>
    {children}
  </Styled.Link>
);
