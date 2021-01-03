import styled from 'styled-components';
import { transparentize } from 'polished';
import { Link as RouterLink } from 'react-router-dom';

export const OriginLink = styled(RouterLink)(
  ({
    selected,
    theme: {
      palette: { black, focus, primary },
    },
  }) => ({
    color: selected ? primary : transparentize(0.33, black),
    fontSize: '0.75rem',
    margin: 0,
    outline: 'none',
    padding: 0,
    textDecoration: 'none',
    ':focus': {
      color: focus,
    },
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: focus,
      },
    },
  }),
);
