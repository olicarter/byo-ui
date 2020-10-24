import React from 'react';

import * as Styled from './Card.styled';

export const Card = ({ children, margin = '0' }) => (
  <Styled.Card margin={margin}>{children}</Styled.Card>
);
