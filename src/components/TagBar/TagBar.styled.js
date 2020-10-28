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
    selected,
    theme: {
      palette: { black, grey, primary },
    },
    to,
  }) => ({
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
        color: to ? primary : transparentize(0.33, black),
      },
    },
  }),
);
