import styled from 'styled-components';

export const Title = styled.h1(({ color, theme: { palette } }) => ({
  color: palette[color],
  fontSize: 'calc(2rem + 4vmin)',
  margin: '1rem 0',
  padding: 0,
}));
