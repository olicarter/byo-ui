import styled from 'styled-components';
import { transparentize } from 'polished';
import { Link as RouterLink } from 'react-router-dom';

export const Bar = styled.div(() => ({
  alignItems: 'center',
  display: 'flex',
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

export const BarItem = styled.li(() => ({
  display: 'flex',
  flexShrink: 0,
  listStyle: 'none',
  margin: 0,
  padding: 0,
}));

export const BarSpan = styled.span(({ theme: { palette: { black } }, to }) => ({
  alignItems: 'center',
  color: transparentize(0.66, black),
  display: 'flex',
  fontSize: '1rem',
  fontWeight: 700,
  padding: '0.5rem 0.5rem',
  textDecoration: 'none',
  userSelect: 'none',
}));

export const BarLink = styled(RouterLink)(
  ({
    color,
    selected,
    theme: {
      palette,
      palette: { black, primary },
    },
    to,
  }) => ({
    alignItems: 'center',
    get color() {
      if (color) return palette[color];
      if (selected) return primary;
      if (to) return black;
      return transparentize(0.33, black);
    },
    display: 'flex',
    fontSize: '1rem',
    fontWeight: 700,
    padding: '0.5rem 0.5rem',
    textDecoration: 'none',
    userSelect: 'none',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        get color() {
          if (color) return transparentize(0.33, palette[color]);
          if (to) return primary;
          return transparentize(0.33, black);
        },
      },
    },
  }),
);
