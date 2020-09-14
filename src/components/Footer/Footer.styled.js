import styled from 'styled-components';

export const Footer = styled.footer(() => ({
  display: 'flex',
  justifyContent: 'center',
  padding: '4rem 1rem',
}));

export const MadeWithText = styled.span(({ theme: { palette: { grey } } }) => ({
  color: grey,
  fontSize: '0.8rem',
}));

export const Heart = styled.span(({ theme: { palette: { red } } }) => ({
  color: red,
}));

export const Anchor = styled.a(({ theme: { palette: { grey } } }) => ({
  color: grey,
  textDecoration: 'none',
}));
