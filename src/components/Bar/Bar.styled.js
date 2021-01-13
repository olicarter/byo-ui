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

export const NavItems = styled.ul(({ wrapChildren }) => ({
  display: 'flex',
  flexWrap: wrapChildren ? 'wrap' : 'nowrap',
  margin: '0 -0.5rem',
  padding: 0,
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
      palette: { black, focus },
    },
    to,
  }) => ({
    alignItems: 'center',
    get color() {
      if (color) return palette[color];
      if (selected) return focus;
      if (to) return black;
      return transparentize(0.33, black);
    },
    display: 'flex',
    fontSize: '1rem',
    fontWeight: 700,
    outline: 'none',
    padding: '0.5rem 0.5rem',
    textDecoration: 'none',
    userSelect: 'none',
    ':focus': {
      color: focus,
    },
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        get color() {
          if (to) return focus;
          return transparentize(0.33, black);
        },
      },
    },
  }),
);
