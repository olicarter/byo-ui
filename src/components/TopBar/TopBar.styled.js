import styled from 'styled-components';
import { transparentize } from 'polished';
import { Link as RouterLink } from 'react-router-dom';
import { animated } from 'react-spring';

export const Wrapper = styled.div(({ theme: { palette: { white } } }) => ({
  width: '100%',
  zIndex: 1,
}));

export const TopBar = styled.div(() => ({
  alignItems: 'center',
  display: 'flex',
  height: '4rem',
  justifyContent: 'space-between',
  paddingRight: '0.5rem',
  userSelect: 'none',
}));

export const Group = styled.div(() => ({
  alignItems: 'center',
  display: 'flex',
}));

export const SVG = styled.svg(
  ({
    theme: {
      palette: { black, primary, red, teal },
    },
  }) => ({
    fill: black,
    height: '2rem',
    overflow: 'visible',
  }),
);

export const Path = styled.path(() => ({
  transitionDuration: '300ms',
  ':nth-of-type(2)': {
    transitionDelay: '33ms',
  },
  ':nth-of-type(3)': {
    transitionDelay: '66ms',
  },
}));

export const Logo = styled.img(() => ({
  height: '2rem',
}));

export const Nav = styled.nav(() => ({
  display: 'flex',
}));

export const NavItems = styled.ul(() => ({
  display: 'flex',
  margin: 0,
  padding: 0,
}));

export const NavItem = styled.li(() => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  listStyle: 'none',
  margin: 0,
  padding: 0,
}));

export const Link = styled(RouterLink)(
  ({
    selected,
    theme: {
      palette: { black, primary, red, teal },
    },
  }) => ({
    background: 'none',
    border: 'none',
    color: selected ? primary : black,
    cursor: 'pointer',
    display: 'flex',
    fontSize: '1rem',
    fontWeight: 700,
    outline: 'none',
    padding: '1rem',
    textDecoration: 'none',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: primary,
        'path:nth-of-type(1)': {
          fill: teal,
        },
        'path:nth-of-type(2)': {
          fill: primary,
        },
        'path:nth-of-type(3)': {
          fill: red,
        },
      },
    },
  }),
);

export const LinkIcon = styled(Link)(() => ({
  padding: '0.5rem',
}));

export const Menu = styled(animated.div)(
  ({
    theme: {
      palette: { white },
    },
  }) => ({
    background: transparentize(0.4, white),
    display: 'flex',
    flexDirection: 'column',
    left: 0,
    // padding: '1rem',
    position: 'fixed',
    top: '4rem',
    bottom: 0,
    right: 0,
    zIndex: 2,
  }),
);

export const MenuItem = styled(animated.div)(
  ({
    theme: {
      palette: { black },
    },
  }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    // color: black,
    // fontSize: '1.2rem',
    // fontWeight: 700,
    // padding: '1rem 0',
  }),
);
