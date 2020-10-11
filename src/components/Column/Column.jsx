import React from 'react';

import * as Styled from './Column.styled';

export const Column = ({ children, flex = 1, order }) => (
  <Styled.Column flex={flex} order={order}>
    {children}
  </Styled.Column>
);
