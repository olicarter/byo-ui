import React from 'react';

import * as Styled from './Button.styled';

export const Button = ({
  backgroundColor = 'primary',
  children,
  onClick,
  type = 'button',
}) => (
  <Styled.Button
    backgroundColor={backgroundColor}
    onClick={onClick}
    type={type}
  >
    {children}
  </Styled.Button>
);
