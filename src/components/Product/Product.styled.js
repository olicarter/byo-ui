import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Product = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const Image = styled.img(() => ({
  objectFit: 'cover',
  paddingBottom: '0.5rem',
  width: '100%',
}));

export const Name = styled(Link)(
  ({
    theme: {
      palette: { black, orange },
    },
  }) => ({
    color: black,
    fontSize: '1.2rem',
    fontWeight: 700,
    margin: 0,
    paddingBottom: '0.5rem',
    textTransform: 'capitalize',
    textDecoration: 'none',
    userSelect: 'none',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: orange,
      },
    },
  }),
);

export const Price = styled.span(() => ({
  fontSize: '0.9rem',
  fontWeight: 500,
  paddingBottom: '0.5rem',
}));

export const Button = styled.button(({ theme: { palette: { orange } } }) => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.1rem',
  fontWeight: 600,
  outline: 'none',
  padding: 0,
  textAlign: 'left',
  width: 'auto',
  '@media (hover: hover) and (pointer: fine)': {
    ':hover': {
      color: orange,
    },
  },
}));
