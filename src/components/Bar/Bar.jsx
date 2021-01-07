import React from 'react';

import * as Styled from './Bar.styled';

export const Bar = ({ children, wrap = true }) => (
  <Styled.Bar>
    <Styled.Nav>
      <Styled.NavItems wrap={wrap}>{children}</Styled.NavItems>
    </Styled.Nav>
  </Styled.Bar>
);

export const BarLink = props => (
  <Styled.BarItem>
    <Styled.BarLink {...props} />
  </Styled.BarItem>
);

export const BarSpan = props => (
  <Styled.BarItem>
    <Styled.BarSpan {...props} />
  </Styled.BarItem>
);
