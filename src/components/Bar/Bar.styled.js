import styled from 'styled-components';

export const Bar = styled.div(() => ({
  alignItems: 'center',
  display: 'flex',
  height: '50px',
  overflowX: 'scroll',
  transitionDuration: '100ms',
  '::-webkit-scrollbar': {
    display: 'none',
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
