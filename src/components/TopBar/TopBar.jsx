import React from 'react';

import * as Styled from './TopBar.styled';
import logo from './byo_logo.png';

export const TopBar = () => (
  <Styled.TopBar className="TopBar">
    <Styled.Link to="/">
      <Styled.Logo src={logo} />
    </Styled.Link>

    <Styled.Nav>
      <Styled.NavItems>
        <Styled.NavItem>
          <Styled.Link to="/products/all">Shop</Styled.Link>
        </Styled.NavItem>
        <Styled.NavItem>
          <Styled.Link to="/blog">Blog</Styled.Link>
        </Styled.NavItem>
      </Styled.NavItems>
    </Styled.Nav>
  </Styled.TopBar>
);
