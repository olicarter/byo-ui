import styled from 'styled-components';
import { transparentize } from 'polished';

export const Card = styled.div(({ margin, theme: { palette: { black } } }) => ({
  alignSelf: 'flex-start',
  border: `2px solid ${transparentize(0.5, black)}`,
  borderRadius: '0.5rem',
  // boxShadow: '0 0 0.4rem 0 rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  margin,
  overflow: 'hidden',
  transitionDuration: '200ms',
  width: '100%',
  '@media (hover: hover) and (pointer: fine)': {
    ':hover': {
      border: `2px solid ${black}`,
      // boxShadow: '0 0 1rem 0.1rem rgba(0, 0, 0, 0.1)',
    },
  },
}));
