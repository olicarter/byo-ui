import styled from 'styled-components';

export const Title = styled.h1(({ color, theme: { palette } }) => ({
  color: palette[color],
  fontSize: '4rem',
  margin: '1rem 0',
  padding: 0,
}));
