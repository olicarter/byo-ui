import styled from 'styled-components';
import { readableColor } from 'polished';

export const Button = styled.button(
  ({
    backgroundColor,
    borderRadius,
    disabled,
    theme: {
      palette,
      palette: { black, primary, white },
    },
  }) => {
    const background = palette[backgroundColor] || primary;
    return {
      backgroundColor: background,
      border: 'none',
      borderRadius: borderRadius ? '0.5rem' : 0,
      color: readableColor(background, black, white),
      cursor: 'pointer',
      flex: 1,
      fontWeight: 700,
      height: '2rem',
      lineHeight: '2rem',
      opacity: disabled ? 0.5 : 1,
      outline: 'none',
      pointerEvents: disabled ? 'none' : 'all',
    };
  },
);
