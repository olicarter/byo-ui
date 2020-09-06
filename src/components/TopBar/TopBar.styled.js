import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const TopBar = styled.div(() => ({
  alignItems: 'center',
  backdropFilter: 'blur(5px)',
  display: 'flex',
  userSelect: 'none',
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
  listStyle: 'none',
  margin: 0,
  padding: 0,
}));

export const Link = styled(RouterLink)(
  ({
    theme: {
      palette: { black, orange },
    },
  }) => ({
    color: black,
    display: 'flex',
    fontSize: '1rem',
    fontWeight: 700,
    padding: '1rem',
    textDecoration: 'none',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: orange,
      },
    },
  }),
);
