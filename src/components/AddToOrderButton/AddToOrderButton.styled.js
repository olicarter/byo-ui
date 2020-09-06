import styled from 'styled-components';

export const AddToOrderButton = styled.button(
  ({
    theme: {
      palette: { green },
    },
  }) => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 600,
    outline: 'none',
    padding: 0,
    textAlign: 'left',
    width: 'auto',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: green,
      },
    },
  }),
);
