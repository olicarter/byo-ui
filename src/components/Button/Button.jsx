import React from 'react';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

import * as Styled from './Button.styled';

export const Button = ({
  backgroundColor = 'primary',
  borderRadius = false,
  children,
  disabled = false,
  flex = 1,
  loading = false,
  onClick,
  type = 'button',
}) => (
  <Styled.Button
    backgroundColor={backgroundColor}
    borderRadius={borderRadius}
    disabled={disabled}
    flex={flex}
    onClick={onClick}
    type={type}
  >
    {loading ? (
      <Icon path={mdiLoading} rotate={90} spin size={0.8} />
    ) : (
      children
    )}
  </Styled.Button>
);
