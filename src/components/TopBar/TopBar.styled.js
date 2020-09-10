import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const TopBar = styled.div(() => ({
  alignItems: 'center',
  backdropFilter: 'blur(5px)',
  display: 'flex',
  justifyContent: 'space-between',
  userSelect: 'none',
}));

export const Group = styled.div(() => ({
  alignItems: 'center',
  display: 'flex',
}));

export const Logo = styled.img(() => ({
  height: '2rem',
}));

export const Nav = styled.nav(() => ({}));

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
      palette: { black, orange },
    },
  }) => ({
    background: 'none',
    border: 'none',
    color: selected ? orange : black,
    cursor: 'pointer',
    display: 'flex',
    fontSize: '1rem',
    fontWeight: 700,
    outline: 'none',
    padding: '1rem',
    textDecoration: 'none',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: orange,
      },
    },
  }),
);
