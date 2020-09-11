import styled from 'styled-components';
import { transparentize } from 'polished';
import { Link as RouterLink } from 'react-router-dom';

export const Spacer = styled.div(({ tagBarVisible }) => ({
  height: tagBarVisible ? '7rem' : '4rem',
}));

export const Wrapper = styled.div(({ theme: { palette: { white } } }) => ({
  background: transparentize(0.5, white),
  backdropFilter: 'blur(20px)',
  left: 0,
  position: 'fixed',
  top: 0,
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
      palette: { black, green },
    },
  }) => ({
    background: 'none',
    border: 'none',
    color: selected ? green : black,
    cursor: 'pointer',
    display: 'flex',
    fontSize: '1rem',
    fontWeight: 700,
    outline: 'none',
    padding: '1rem',
    textDecoration: 'none',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: green,
      },
    },
  }),
);

export const LinkIcon = styled(Link)(() => ({
  padding: '0.5rem',
}));
