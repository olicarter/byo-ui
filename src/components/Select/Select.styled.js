import styled from 'styled-components';
import { darken, readableColor, transparentize } from 'polished';

export const SelectWrapper = styled.div(
  ({
    theme: {
      palette: { black, primary, white },
    },
  }) => ({
    backgroundColor: transparentize(0.9, black),
    color: readableColor(primary, black, white),
    fontSize: '1.1rem',
    fontWeight: 700,
    height: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    userSelect: 'none',
  }),
);

export const Select = styled.select(
  ({
    borderRadius,
    disabled,
    theme: {
      palette: { black, lightGrey, primary, white },
    },
  }) => ({
    appearance: 'none',
    backgroundColor: 'inherit',
    border: 'none',
    borderRadius: borderRadius ? '0.5rem' : 0,
    color: readableColor(primary, black, white),
    cursor: 'pointer',
    flex: 1,
    fontWeight: 'inherit',
    height: '100%',
    opacity: disabled ? 0.5 : 1,
    outline: 'none',
    // padding: '0 0.5rem',
    pointerEvents: disabled ? 'none' : 'all',
    textAlignLast: 'center',
    width: '100%',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        backgroundColor: darken(0.05, transparentize(0.9, black)),
      },
    },
  }),
);
