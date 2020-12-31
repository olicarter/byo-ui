import styled from 'styled-components';
import { transparentize } from 'polished';
import { Link as RouterLink } from 'react-router-dom';

export const NavItem = styled.li(() => ({
  display: 'flex',
  flexShrink: 0,
  listStyle: 'none',
  margin: 0,
  padding: 0,
}));

export const Tag = styled(RouterLink)(
  ({
    color,
    selected,
    theme: {
      palette,
      palette: { black, grey, primary },
    },
    to,
  }) => ({
    alignItems: 'center',
    get color() {
      if (color) return palette[color];
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
        get color() {
          if (color) return transparentize(0.33, palette[color]);
          if (to) return primary;
          return grey;
        },
      },
    },
  }),
);