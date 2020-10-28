import React from 'react';

import * as Styled from './Bar.styled';

export const Bar = ({ children }) => (
  <Styled.Bar>
    <Styled.Nav>
      <Styled.NavItems>{children}</Styled.NavItems>
    </Styled.Nav>
  </Styled.Bar>
);
