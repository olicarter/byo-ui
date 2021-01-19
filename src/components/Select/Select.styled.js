import styled from 'styled-components';
import { darken } from 'polished';

export const SelectWrapper = styled.div(
  ({
    theme: {
      palette: { primary, readableColor },
    },
  }) => ({
    backgroundColor: primary,
    color: readableColor(primary),
    fontSize: '1rem',
    fontWeight: 700,
    height: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    userSelect: 'none',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        backgroundColor: darken(0.05, primary),
      },
    },
  }),
);

export const Select = styled.select(({ borderRadius, disabled }) => ({
  appearance: 'none',
  backgroundColor: 'inherit',
  border: 'none',
  borderRadius: borderRadius ? '0.5rem' : 0,
  color: 'inherit',
  cursor: 'pointer',
  flex: 1,
  fontSize: '1rem',
  fontWeight: 'inherit',
  height: '100%',
  opacity: disabled ? 0.5 : 1,
  outline: 'none',
  padding: '0 1rem',
  pointerEvents: disabled ? 'none' : 'all',
  width: '100%',
}));
