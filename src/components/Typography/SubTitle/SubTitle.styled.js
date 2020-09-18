import styled from 'styled-components';

export const SubTitle = styled.h3(({ theme: { palette: { black } } }) => ({
  color: black,
  fontSize: '1.5rem',
  margin: '1rem 0',
  padding: 0,
}));
