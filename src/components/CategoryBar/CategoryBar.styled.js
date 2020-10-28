import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const CategoryBar = styled.div(() => ({
  alignItems: 'center',
  display: 'flex',
  height: '50px',
  overflowX: 'scroll',
  transitionDuration: '100ms',
  webkitScrollbar: {
    display: 'none',
  },
  '@media (hover: hover) and (pointer: fine)': {
    opacity: 0.9,
    ':hover': {
      opacity: 1,
    },
  },
}));

export const Nav = styled.nav(() => ({
  display: 'flex',
  margin: 0,
  padding: 0,
}));

export const NavItems = styled.ul(() => ({
  display: 'flex',
  margin: 0,
  padding: '0 0.5rem',
}));

export const NavItem = styled.li(() => ({
  display: 'flex',
  flexShrink: 0,
  listStyle: 'none',
  margin: 0,
  padding: 0,
}));

export const Tag = styled(RouterLink)(
  ({
    selected,
    theme: {
      palette: { black, grey, primary },
    },
    to,
  }) => ({
    alignItems: 'center',
    get color() {
      if (selected) return primary;
      if (to) return black;
      return grey;
    },
    display: 'flex',
    fontSize: '1rem',
    fontWeight: 700,
    padding: '1rem 0.5rem',
    textDecoration: 'none',
    userSelect: 'none',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: to ? primary : grey,
      },
    },
  }),
);
