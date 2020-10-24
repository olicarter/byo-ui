import React, { useEffect, useRef, useState } from 'react';
import { Route, useLocation, useRouteMatch } from 'react-router-dom';
import { parse } from 'qs';
import { useQuery } from '@apollo/client';
import { useChain, useTransition } from 'react-spring';
import Icon from '@mdi/react';
import {
  mdiAccountCircleOutline,
  mdiClose,
  mdiFacebook,
  mdiInformationOutline,
  mdiInstagram,
  mdiMenu,
  mdiStoreOutline,
} from '@mdi/js';

import { useAuth, useTheme } from '../../contexts';
import { GET_SETTINGS } from './TopBar.gql';
import * as Styled from './TopBar.styled';
import logo from './byo_logo.png';
import { BasketIcon } from '../BasketIcon';
import { Button } from '../Button';
import { CategoryBar } from '../CategoryBar';
import { TagBar } from '../TagBar';

export const TopBar = () => {
  const { pathname, search } = useLocation();
  const { isAuthenticated, openLoginModal } = useAuth();

  const tagBarVisible = !!useRouteMatch({ exact: true, path: '/products' });

  const { 'menu-visible': menuVisible } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const { isDesktop } = useTheme();

  const [menuItemsRight, setMenuItemsRight] = useState([]);

  const {
    data: { allSettings: [{ facebookUrl, instagramUrl } = {}] = [] } = {},
  } = useQuery(GET_SETTINGS);

  const menuItemsLeft = [
    {
      key: 'shop',
      icon: mdiStoreOutline,
      title: 'Shop',
      to: '/products',
    },
    {
      key: 'about',
      icon: mdiInformationOutline,
      title: 'About',
      to: '/about',
    },
  ];
  useEffect(() => {
    if (isAuthenticated) {
      setMenuItemsRight([
        {
          key: 'facebook',
          as: 'a',
          href: facebookUrl,
          target: '_blank',
          icon: mdiFacebook,
          title: 'Facebook',
        },
        {
          key: 'instagram',
          as: 'a',
          href: instagramUrl,
          target: '_blank',
          icon: mdiInstagram,
          title: 'Instagram',
        },
        {
          key: 'basket',
          title: 'Basket',
          to: '/basket',
          component: <BasketIcon />,
        },
        {
          key: 'account',
          to: '/account',
          icon: mdiAccountCircleOutline,
          title: 'Account',
        },
      ]);
    } else {
      setMenuItemsRight([
        {
          key: 'facebook',
          as: 'a',
          href: facebookUrl,
          target: '_blank',
          icon: mdiFacebook,
          title: 'Facebook',
        },
        {
          key: 'instagram',
          as: 'a',
          href: instagramUrl,
          target: '_blank',
          icon: mdiInstagram,
          title: 'Instagram',
        },
      ]);
    }
  }, [isAuthenticated, facebookUrl, instagramUrl]);

  const menuRef = useRef();
  const menuTransitions = useTransition(menuVisible, null, {
    ref: menuRef,
    config: { duration: 500 },
    from: {
      backdropFilter: 'blur(0px)',
      WebkitBackdropFilter: 'blur(0px)',
      opacity: 0,
    },
    enter: {
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      opacity: 1,
    },
    leave: {
      backdropFilter: 'blur(0px)',
      WebkitBackdropFilter: 'blur(0px)',
      opacity: 0,
    },
  });

  const menuItemsRef = useRef();
  const menuItemsTransitions = useTransition(
    menuVisible ? [...menuItemsLeft, ...menuItemsRight] : [],
    item => item.key,
    {
      ref: menuItemsRef,
      unique: true,
      trail: menuVisible ? 50 : 0,
      from: {
        opacity: 0,
      },
      enter: {
        opacity: 1,
      },
      leave: {
        opacity: 0,
      },
    },
  );

  useChain(
    menuVisible ? [menuRef, menuItemsRef] : [menuItemsRef, menuRef],
    menuVisible ? [0, 0.5] : [0, 0],
  );

  return (
    <>
      <Styled.Spacer tagBarVisible={tagBarVisible} />
      <Styled.Wrapper>
        <Styled.TopBar className="TopBar">
          <Styled.Group>
            <Styled.Link to="/">
              <Styled.Logo src={logo} />
            </Styled.Link>

            {isDesktop ? (
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
                </Styled.NavItems>

                <Styled.NavItems>
                  <Styled.NavItem>
                    <Styled.Link
                      selected={pathname.includes('about')}
                      to="/about"
                    >
                      about
                    </Styled.Link>
                  </Styled.NavItem>
                </Styled.NavItems>
              </Styled.Nav>
            ) : null}
          </Styled.Group>

          <Styled.Nav>
            <Styled.NavItems>
              {isDesktop ? (
                <>
                  {menuItemsRight.map(
                    ({ as, component, href, target, icon, title, to }) => (
                      <Styled.NavItem>
                        <Styled.LinkIcon
                          as={as}
                          href={href}
                          target={target}
                          to={to}
                        >
                          {component || (
                            <Icon path={icon} size={1} title={title} />
                          )}
                        </Styled.LinkIcon>
                      </Styled.NavItem>
                    ),
                  )}
                  {isAuthenticated ? null : (
                    <Styled.NavItem>
                      <Styled.LinkIcon>
                        <Button borderRadius onClick={openLoginModal}>
                          Log in
                        </Button>
                      </Styled.LinkIcon>
                    </Styled.NavItem>
                  )}
                </>
              ) : (
                <Styled.NavItem>
                  <Styled.LinkIcon
                    to={({ pathname }) =>
                      menuVisible ? pathname : `${pathname}?menu-visible=true`
                    }
                  >
                    {menuVisible ? (
                      <Icon path={mdiClose} size={1} title="CloseMenu" />
                    ) : (
                      <Icon path={mdiMenu} size={1} title="OpenMenu" />
                    )}
                  </Styled.LinkIcon>
                </Styled.NavItem>
              )}
            </Styled.NavItems>
          </Styled.Nav>
        </Styled.TopBar>

        <Route exact path="/products">
          <CategoryBar />
          <TagBar />
        </Route>
      </Styled.Wrapper>

      {menuTransitions.map(
        ({ item: menuItem, props: menuProps }) =>
          menuItem && (
            <Styled.Menu style={menuProps}>
              {menuItemsTransitions.map(
                ({
                  item: menuItemsItem,
                  item: { as, component, href, target, icon, title, to },
                  key,
                  props,
                }) =>
                  menuItemsItem && (
                    <Styled.Link as={as} href={href} target={target} to={to}>
                      <Styled.MenuItem key={key} style={props}>
                        <span>{title}</span>
                        {component || (
                          <Icon path={icon} size={1} title={title} />
                        )}
                      </Styled.MenuItem>
                    </Styled.Link>
                  ),
              )}
            </Styled.Menu>
          ),
      )}
    </>
  );
};
