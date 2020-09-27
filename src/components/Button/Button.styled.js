import styled from 'styled-components';
import { readableColor } from 'polished';

export const Button = styled.button(
  ({
    backgroundColor,
    theme: {
      palette,
      palette: { black, primary, white },
    },
  }) => {
    const background = palette[backgroundColor] || primary;
    return {
      backgroundColor: background,
      border: 'none',
      color: readableColor(background, black, white),
      cursor: 'pointer',
      flex: 1,
      fontWeight: 700,
      height: '2rem',
      outline: 'none',
    };
  },
);
