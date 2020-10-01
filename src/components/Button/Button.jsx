import React from 'react';

import * as Styled from './Button.styled';

export const Button = ({
  backgroundColor = 'primary',
  borderRadius = false,
  children,
  disabled = false,
  onClick,
  type = 'button',
}) => (
  <Styled.Button
    backgroundColor={backgroundColor}
    borderRadius={borderRadius}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </Styled.Button>
);
