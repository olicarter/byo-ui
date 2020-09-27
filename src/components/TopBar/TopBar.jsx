import React from 'react';
import { Route, useLocation, useRouteMatch } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';

import * as Styled from './TopBar.styled';
import logo from './byo_logo.png';
import { BasketIcon } from '../BasketIcon';
import { CategoryBar } from '../CategoryBar';
//import { UserPaidOrders } from '../UserPaidOrders';
import { TagBar } from '../TagBar';

export const TopBar = () => {
  const { pathname } = useLocation();
  const tagBarVisible = useRouteMatch('/categories/:categorySlug');

  return (
    <>
      <Styled.Spacer tagBarVisible={tagBarVisible} />
      <Styled.Wrapper>
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
                    to="/products"
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
              <Styled.NavItem>
                <Styled.LinkIcon to="/basket">
                  <BasketIcon />
                </Styled.LinkIcon>
              </Styled.NavItem>
              <Styled.NavItem>
                <Styled.LinkIcon to="/account">
                  <Icon path={mdiAccountCircle} size={1} title="Account" />
                </Styled.LinkIcon>
              </Styled.NavItem>
            </Styled.NavItems>
          </Styled.Nav>
        </Styled.TopBar>

        <Route path="/products">
          <CategoryBar />
          <TagBar />
        </Route>
      </Styled.Wrapper>
    </>
  );
};
