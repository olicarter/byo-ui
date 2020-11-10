import React, { forwardRef } from 'react';

import * as Styled from './TextInput.styled';

export const TextInput = forwardRef(
  (
    { autoFocus = false, name, onChange, type = 'text', value, placeholder },
    ref,
  ) => (
    <Styled.TextInput
      autoFocus={autoFocus}
      name={name}
      onChange={e => typeof onChange === 'function' && onChange(e.target.value)}
      ref={ref}
      type={type}
      value={value}
      placeholder={placeholder}
    />
  ),
);
