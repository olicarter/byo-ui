import styled from 'styled-components';
import { transparentize } from 'polished';
import { default as MdiIcon } from '@mdi/react';

const height = 'auto';

export const ProductVariant = styled.div(
  ({
    theme: {
      palette: { black },
    },
  }) => ({
    alignItems: 'stretch',
    display: 'flex',
    height,
    position: 'relative',
    ':not(:last-of-type)': {
      ':after': {
        backgroundColor: transparentize(0.9, black),
        top: 0,
        content: '""',
        height: '2px',
        position: 'absolute',
        width: '100%',
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
  width: '36px',
}));

export const DecrementButton = styled(SquareButton)(
  ({
    disabled,
    theme: {
      palette: { blue, focus, red },
    },
    quantity,
  }) => ({
    color: red,
    display: quantity ? 'flex' : 'none',
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'all',
    ':focus': {
      color: focus,
    },
    ...(disabled
      ? {}
      : {
          '@media (hover: hover) and (pointer: fine)': {
            ':hover': {
              color: focus,
            },
          },
        }),
  }),
);

export const IncrementButton = styled(SquareButton)(
  ({
    disabled,
    theme: {
      palette: { blue, focus, green },
    },
  }) => ({
    color: green,
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'all',
    transitionDuration: '150ms',
    ':focus': {
      color: focus,
    },
    ...(disabled
      ? {}
      : {
          '@media (hover: hover) and (pointer: fine)': {
            ':hover': {
              color: focus,
            },
          },
        }),
  }),
);

export const Info = styled.div(
  ({
    theme: {
      palette: { black },
    },
    quantity,
  }) => ({
    color: black,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: `0.5rem ${quantity ? 0 : 0}rem`,
  }),
);

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

export const Tags = styled(Quantity)(({ theme: { palette: { black } } }) => ({
  color: transparentize(0.33, black),
  fontWeight: 400,
}));

export const Container = styled.span(({ theme: { palette: { black } } }) => ({
  color: transparentize(0.5, black),
  whiteSpace: 'pre',
}));

export const Icon = styled(MdiIcon)(() => ({
  g: {
    animationDuration: '1s !important',
  },
}));
