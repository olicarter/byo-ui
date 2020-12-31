import styled from 'styled-components';
import { transparentize } from 'polished';
import { Link as RouterLink } from 'react-router-dom';

export const Brand = styled(RouterLink)(
  ({
    selected,
    theme: {
      palette: { black, primary },
    },
  }) => ({
    color: selected ? primary : transparentize(0.33, black),
    fontSize: '0.75rem',
    margin: 0,
    padding: 0,
    textDecoration: 'none',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: primary,
      },
    },
  }),
);
