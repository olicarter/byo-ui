import styled from 'styled-components';

export const Card = styled.div(({ margin }) => ({
  alignSelf: 'flex-start',
  borderRadius: '0.5rem',
  boxShadow: '0 0 0.4rem 0 rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  margin,
  overflow: 'hidden',
  transitionDuration: '200ms',
  width: '100%',
  '@media (hover: hover) and (pointer: fine)': {
    ':hover': {
      boxShadow: '0 0 1rem 0.1rem rgba(0, 0, 0, 0.1)',
    },
  },
}));
