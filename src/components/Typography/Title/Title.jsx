import React from 'react';
import { titleCase } from 'title-case';

import * as Styled from './Title.styled';

export const Title = ({ children, color = 'black' }) => (
  <Styled.Title color={color}>{titleCase(children || '')}</Styled.Title>
);
