import styled from 'styled-components';

export const Title = styled.h1(({ theme: { palette: { black } } }) => ({
  color: black,
  fontSize: '2.5rem',
  margin: '1rem 0',
  padding: 0,
}));
