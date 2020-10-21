import styled from 'styled-components';

export const Label = styled.label(({ color, theme: { palette } }) => ({
  color: palette[color],
  fontSize: '1.2rem',
  fontWeight: 700,
}));
