import styled from 'styled-components';
import { default as MdiIcon } from '@mdi/react';

const height = '3rem';

export const ProductVariant = styled.div(() => ({
  alignItems: 'center',
  display: 'flex',
  height,
}));

const SquareButton = styled.button(() => ({
  alignItems: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '1.5rem',
  fontWeight: 500,
  height,
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
    height: '100%',
    userSelect: 'none',
  }),
);

export const Price = styled(Quantity)(() => ({}));

export const Container = styled.span(({ theme: { palette: { grey } } }) => ({
  color: grey,
  whiteSpace: 'pre',
}));

export const Icon = styled(MdiIcon)(() => ({
  g: {
    animationDuration: '1s !important',
  },
}));
