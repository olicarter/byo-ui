import React from 'react';

import * as Styled from './Grid.styled';

export const Grid = ({
  children,
  gridTemplateColumns = 'repeat(auto-fill, minmax(240px, 1fr))',
}) => (
  <Styled.Grid gridTemplateColumns={gridTemplateColumns}>
    {children}
  </Styled.Grid>
);
