import styled from 'styled-components';

export const Buttons = styled.div(() => ({
  background: '',
  display: 'flex',
  justifyContent: 'space-between',
}));

export const DecrementButton = styled.button(
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

export const Quantity = styled.div(() => ({
  flex: 1,
  fontSize: '1.1rem',
  fontWeight: 600,
  textAlign: 'center',
}));

export const IncrementButton = styled.button(
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
