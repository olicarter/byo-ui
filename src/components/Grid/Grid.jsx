import React from 'react';

import * as Styled from './Grid.styled';

export const Grid = ({
  children,
  gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))',
}) => (
  <Styled.Grid gridTemplateColumns={gridTemplateColumns}>
    {children}
  </Styled.Grid>
);
