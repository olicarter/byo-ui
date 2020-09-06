import React from 'react';
import { useLocation } from 'react-router-dom';

import * as Styled from './TopBar.styled';
import logo from './byo_logo.png';

export const TopBar = () => {
  const { pathname } = useLocation();

  return (
    <Styled.TopBar className="TopBar">
      <Styled.Link to="/">
        <Styled.Logo src={logo} />
      </Styled.Link>

      <Styled.Nav>
        <Styled.NavItems>
          <Styled.NavItem>
            <Styled.Link
              active={pathname.includes('products')}
              to="/products/all"
            >
              shop
            </Styled.Link>
          </Styled.NavItem>
          <Styled.NavItem>
            <Styled.Link active={pathname.includes('blog')} to="/blog">
              blog
            </Styled.Link>
          </Styled.NavItem>
        </Styled.NavItems>
      </Styled.Nav>
    </Styled.TopBar>
  );
};
