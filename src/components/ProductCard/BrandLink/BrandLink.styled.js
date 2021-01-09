import styled from 'styled-components';
import { transparentize } from 'polished';

export const BrandLink = styled.span(
  ({
    loading,
    selected,
    theme: {
      palette: { black, focus, primary },
    },
    to,
  }) => ({
    color: selected ? primary : transparentize(0.33, black),
    cursor: to ? 'pointer' : 'default',
    fontSize: '0.75rem',
    fontWeight: 400,
    height: '16px',
    margin: 0,
    outline: 'none',
    padding: 0,
    textDecoration: 'none',
    ...(to
      ? {
          ':focus': { color: focus },
          '@media (hover: hover) and (pointer: fine)': {
            ':hover': {
              color: loading ? transparentize(0.33, black) : focus,
            },
          },
        }
      : {}),
  }),
);
