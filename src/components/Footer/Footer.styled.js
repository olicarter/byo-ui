import styled from 'styled-components';

export const Footer = styled.footer(() => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  opacity: 0.5,
  padding: '1rem 0 3rem',
}));

export const Paragraph = styled.p(({ theme: { palette: { grey } } }) => ({
  color: grey,
  fontSize: '0.8rem',
  margin: 0,
  padding: 0,
  textAlign: 'center',
  userSelect: 'none',
  ':not(:first-of-type)': {
    marginTop: '1rem',
  },
}));

export const Heart = styled.span(({ theme: { palette: { red } } }) => ({
  color: red,
}));

export const Anchor = styled.a(({ theme: { palette: { grey, focus } } }) => ({
  color: grey,
  display: 'inline-block',
  outline: 'none',
  textDecoration: 'none',
  ':focus': {
    color: focus,
  },
  '@media (hover: hover) and (pointer: fine)': {
    ':hover': {
      color: focus,
    },
  },
}));
