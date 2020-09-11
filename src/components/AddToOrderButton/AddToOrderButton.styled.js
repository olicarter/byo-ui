import styled from 'styled-components';

export const Buttons = styled.div(() => ({
  background: '',
  display: 'flex',
  justifyContent: 'space-between',
}));

const SquareButton = styled.button(() => ({
  alignItems: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '1.5rem',
  fontWeight: 600,
  height: '2rem',
  justifyContent: 'center',
  outline: 'none',
  padding: 0,
  textAlign: 'left',
  width: '2rem',
}));

export const DecrementButton = styled(SquareButton)(
  ({
    theme: {
      palette: { red },
    },
  }) => ({
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: red,
      },
    },
  }),
);

export const IncrementButton = styled(SquareButton)(
  ({
    theme: {
      palette: { green },
    },
  }) => ({
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: green,
      },
    },
  }),
);

export const Text = styled.div(() => ({
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  fontSize: '1rem',
  fontWeight: 600,
  height: '2rem',
  justifyContent: 'center',
  userSelect: 'none',
}));

export const NewOrderItemButton = styled(Text)(
  ({
    theme: {
      palette: { green },
    },
  }) => ({
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: green,
        cursor: 'pointer',
      },
    },
  }),
);
