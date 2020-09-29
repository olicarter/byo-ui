import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const CategoryBar = styled.div(() => ({
  alignItems: 'center',
  display: 'flex',
  height: '2.5rem',
  overflowX: 'scroll',
}));

export const Nav = styled.nav(() => ({
  height: '100%',
}));

export const NavItems = styled.ul(() => ({
  display: 'flex',
  height: '100%',
  margin: 0,
  padding: '0 0.5rem',
}));

export const NavItem = styled.li(() => ({
  flexShrink: 0,
  height: '100%',
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
    height: '100%',
    padding: '0 0.5rem',
    textDecoration: 'none',
    userSelect: 'none',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: to ? primary : grey,
      },
    },
  }),
);
