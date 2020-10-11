import styled from 'styled-components';
import { darken, readableColor } from 'polished';

export const Select = styled.select(
  ({
    borderRadius,
    disabled,
    theme: {
      palette: { black, lightGrey, primary, white },
    },
    value,
  }) => ({
    appearance: 'none',
    backgroundColor: lightGrey,
    border: 'none',
    borderRadius: borderRadius ? '0.5rem' : 0,
    color: readableColor(primary, black, white),
    cursor: 'pointer',
    flex: 1,
    fontWeight: 700,
    height: '2rem',
    lineHeight: '2rem',
    opacity: disabled ? 0.5 : 1,
    outline: 'none',
    padding: '0 0.5rem',
    pointerEvents: disabled ? 'none' : 'all',
    textAlignLast: 'center',
    userSelect: 'none',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        backgroundColor: darken(0.05, lightGrey),
      },
    },
  }),
);
