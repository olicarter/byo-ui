import styled from 'styled-components';

export const SubTitle = styled.h3(({ color, margin, theme: { palette } }) => ({
  color: palette[color],
  fontSize: '1.75rem',
  margin,
  padding: 0,
}));
