import styled from 'styled-components';
import { default as MdiIcon } from '@mdi/react';

const height = 'auto';

export const ProductVariant = styled.div(
  ({
    theme: {
      palette: { lightGrey },
    },
  }) => ({
    alignItems: 'stretch',
    display: 'flex',
    height,
    position: 'relative',
    ':not(:last-of-type)': {
      ':after': {
        backgroundColor: lightGrey,
        bottom: 0,
        content: '""',
        height: '1px',
        margin: '0 1rem',
        position: 'absolute',
        width: 'calc(100% - 2rem)',
      },
    },
  }),
);

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
  width: '48px',
}));

export const DecrementButton = styled(SquareButton)(
  ({
    theme: {
      palette: { red },
    },
    quantity,
  }) => ({
    color: red,
    opacity: quantity ? 1 : 0.1,
    pointerEvents: quantity ? 'all' : 'none',
  }),
);

export const IncrementButton = styled(SquareButton)(
  ({
    theme: {
      palette: { green },
    },
  }) => ({
    color: green,
  }),
);

export const Info = styled.div(() => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0.5rem 0',
}));

export const Quantity = styled.div(
  ({
    theme: {
      palette: { primary },
    },
    quantity,
  }) => ({
    alignItems: 'center',
    color: quantity ? primary : 'inherit',
    display: 'flex',
    fontSize: '0.8rem',
    fontWeight: 700,
    userSelect: 'none',
  }),
);

export const Price = styled(Quantity)(() => ({}));

export const Tags = styled(Quantity)(({ theme: { palette: { grey } } }) => ({
  color: grey,
  fontWeight: 400,
}));

export const Container = styled.span(({ theme: { palette: { grey } } }) => ({
  color: grey,
  whiteSpace: 'pre',
}));

export const Icon = styled(MdiIcon)(() => ({
  g: {
    animationDuration: '1s !important',
  },
}));
