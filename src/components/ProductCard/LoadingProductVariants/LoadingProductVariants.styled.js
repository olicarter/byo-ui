import styled from 'styled-components';
import { transparentize } from 'polished';

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
    ':before': {
      backgroundColor: transparentize(0.9, black),
      top: 0,
      content: '""',
      height: '2px',
      position: 'absolute',
      width: '100%',
    },
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
    padding: `0.5rem ${quantity ? 0 : 0.5}rem`,
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
    opacity: 0.5,
    userSelect: 'none',
  }),
);
