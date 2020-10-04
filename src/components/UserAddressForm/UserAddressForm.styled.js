import styled from 'styled-components';

export const Form = styled.form(({ theme: { palette: { white } } }) => ({
  padding: '1rem',
}));

export const Heading = styled.h3(({ theme: { palette: { black } } }) => ({
  color: black,
  cursor: 'default',
  fontSize: '1.8rem',
  fontWeight: 700,
  margin: 0,
  padding: 0,
}));
