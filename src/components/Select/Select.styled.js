import styled from 'styled-components';
import { transparentize } from 'polished';

export const SelectWrapper = styled.div(
  ({
    theme: {
      palette: { black, readableColor },
    },
  }) => ({
    backgroundColor: transparentize(0.8, black),
    color: readableColor(transparentize(0.8, black)),
    fontSize: '1.1rem',
    fontWeight: 700,
    height: '3rem',
    lineHeight: '3rem',
    textAlign: 'center',
    userSelect: 'none',
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
  fontWeight: 'inherit',
  height: '100%',
  opacity: disabled ? 0.5 : 1,
  outline: 'none',
  // padding: '0 0.5rem',
  pointerEvents: disabled ? 'none' : 'all',
  textAlignLast: 'center',
  width: '100%',
}));
