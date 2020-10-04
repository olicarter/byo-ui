import React from 'react';

import * as Styled from './TextInput.styled';

export const TextInput = ({
  autoFocus = false,
  onChange,
  type = 'text',
  value,
}) => (
  <Styled.TextInput
    autoFocus={autoFocus}
    onChange={e => typeof onChange === 'function' && onChange(e.target.value)}
    type={type}
    value={value}
  />
);
