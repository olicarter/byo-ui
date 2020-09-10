import React from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../contexts';
import * as Styled from './TopBar.styled';
import logo from './byo_logo.png';
import { Avatar } from '../Avatar';

export const TopBar = () => {
  const { pathname } = useLocation();
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <Styled.TopBar className="TopBar">
      <Styled.Group>
        <Styled.Link to="/">
          <Styled.Logo src={logo} />
        </Styled.Link>

        <Styled.Nav>
          <Styled.NavItems>
            <Styled.NavItem>
              <Styled.Link
                selected={pathname.includes('products')}
                to="/products/all"
              >
                shop
              </Styled.Link>
            </Styled.NavItem>
            <Styled.NavItem>
              <Styled.Link selected={pathname.includes('blog')} to="/blog">
                blog
              </Styled.Link>
            </Styled.NavItem>
          </Styled.NavItems>
        </Styled.Nav>
      </Styled.Group>

      <Styled.Nav>
        <Styled.NavItems>
          {/* <Styled.NavItem>
            <Styled.Link as="button" onClick={isAuthenticated ? logout : login}>
              {isAuthenticated ? 'logout' : 'login'}
            </Styled.Link>
          </Styled.NavItem> */}
          <Styled.NavItem>
            <Styled.Link>
              <Avatar />
            </Styled.Link>
          </Styled.NavItem>
        </Styled.NavItems>
      </Styled.Nav>
    </Styled.TopBar>
  );
};
