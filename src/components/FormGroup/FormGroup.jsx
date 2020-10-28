import React from 'react';

import * as Styled from './FormGroup.styled';
import { Label } from '../Label';

export const FormGroup = ({
  children,
  errorInfo,
  flex = 1,
  horizontal = false,
  info,
  label,
  largeLabel,
  margin = '2rem 0 0',
}) => (
  <Styled.FormGroup flex={flex} horizontal={horizontal} margin={margin}>
    {label ? (
      <Styled.Label>
        <Label large={largeLabel}>{label}</Label>
      </Styled.Label>
    ) : null}
    {info ? <Styled.Info>{info}</Styled.Info> : null}
    {errorInfo ? <Styled.Info color="red">{errorInfo}</Styled.Info> : null}
    {children}
  </Styled.FormGroup>
);
