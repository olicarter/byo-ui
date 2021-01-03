import styled from 'styled-components';
import { transparentize } from 'polished';
import { Link as RouterLink } from 'react-router-dom';

export const BrandLink = styled(RouterLink)(
  ({
    loading,
    selected,
    theme: {
      palette: { black, focus, primary },
    },
  }) => ({
    color: selected ? primary : transparentize(0.33, black),
    cursor: loading ? 'default' : 'pointer',
    fontSize: '0.75rem',
    fontWeight: 400,
    height: '16px',
    margin: 0,
    outline: 'none',
    padding: 0,
    textDecoration: 'none',
    ':focus': {
      color: focus,
    },
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: loading ? transparentize(0.33, black) : focus,
      },
    },
  }),
);
