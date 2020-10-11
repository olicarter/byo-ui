import React from 'react';

import * as Styled from './FormGroup.styled';
import { Label } from '../Label';

export const FormGroup = ({ children, errorInfo, info, label }) => (
  <Styled.FormGroup>
    {label ? (
      <Styled.Label>
        <Label>{label}</Label>
      </Styled.Label>
    ) : null}
    {info ? <Styled.Info>{info}</Styled.Info> : null}
    {errorInfo ? <Styled.Info color="red">{errorInfo}</Styled.Info> : null}
    {children}
  </Styled.FormGroup>
);
