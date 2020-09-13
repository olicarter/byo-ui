import styled from 'styled-components';
import { darken, readableColor } from 'polished';

const height = 'calc(1.5rem + 1vw)';

export const Buttons = styled.div(({ theme: { palette: { lightGrey } } }) => ({
  alignItems: 'center',
  background: lightGrey,
  display: 'flex',
  height,
  justifyContent: 'space-between',
}));

const SquareButton = styled.button(() => ({
  alignItems: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '1.5rem',
  fontWeight: 500,
  justifyContent: 'center',
  lineHeight: height,
  outline: 'none',
  padding: 0,
  textAlign: 'left',
  width: height,
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

export const Quantity = styled.div(() => ({
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  fontSize: 'inherit',
  fontWeight: 600,
  height: '100%',
  justifyContent: 'center',
  userSelect: 'none',
}));

export const NewOrderItemButton = styled(Quantity)(
  ({
    theme: {
      palette: { black, green },
    },
  }) => ({
    color: black,
    cursor: 'pointer',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: green,
      },
    },
  }),
);
