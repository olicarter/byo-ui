import styled from 'styled-components';

export const LoginForm = styled.form(({ theme: { palette: { white } } }) => ({
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

export const Info = styled.p(({ theme: { palette: { grey } } }) => ({
  color: grey,
  cursor: 'default',
  fontSize: '0.8rem',
  margin: '0.5rem 0 0',
  padding: 0,
}));
