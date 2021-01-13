import React from 'react';

import * as Styled from './Title.styled';

export const Title = ({ children, color = 'black' }) => (
  <Styled.Title color={color}>{children}</Styled.Title>
);
