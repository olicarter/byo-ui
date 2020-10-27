import styled from 'styled-components';

export const Label = styled.label(({ color, large, theme: { palette } }) => ({
  color: palette[color],
  fontSize: large ? '1.2rem' : '1rem',
  fontWeight: large ? 700 : 600,
}));
