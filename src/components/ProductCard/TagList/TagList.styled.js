import styled from 'styled-components';
import { transparentize } from 'polished';
import { Link as RouterLink } from 'react-router-dom';

export const TagList = styled.ul(({ theme: { palette: { black } } }) => ({
  display: 'flex',
  margin: 0,
  padding: 0,
  '@media (hover: hover) and (pointer: fine)': {
    ':hover': {
      '> .Tag:after': {
        color: transparentize(0.33, black),
      },
    },
  },
}));

export const Tag = styled(RouterLink)(
  ({
    selected,
    theme: {
      palette: { black, focus, primary },
    },
    to,
  }) => ({
    alignItems: 'center',
    borderRadius: '8px',
    color: selected ? primary : transparentize(0.33, black),
    cursor: to ? 'pointer' : 'default',
    display: 'flex',
    fontSize: '0.75rem',
    fontWeight: 600,
    height: '16px',
    justifyContent: 'center',
    lineHeight: 1,
    margin: 0,
    outline: 'none',
    padding: '0 0 0 0.25rem',
    textDecoration: 'none',
    ':after': {
      content: 'attr(data-abbreviation)',
    },
    '&&:focus:after': {
      color: focus,
      content: 'attr(data-slug)',
    },
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        '&&:after': {
          get color() {
            if (selected || to) return primary;
            return transparentize(0.33, black);
          },
          content: 'attr(data-slug)',
        },
      },
    },
  }),
);
