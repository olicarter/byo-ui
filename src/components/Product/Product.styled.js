import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Product = styled.div(({ theme: { palette: { grey } } }) => ({
  boxShadow: '0.2rem 0.2rem 0 0 rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  transitionDuration: '150ms',
}));

export const AspectRatio = styled.div(() => ({
  height: 0,
  overflow: 'hidden',
  paddingTop: '66.66%',
  position: 'relative',
}));

export const Image = styled.img(() => ({
  height: '100%',
  left: 0,
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  width: '100%',
}));

export const Content = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0.5rem',
}));

export const Name = styled(Link)(({ theme: { palette: { black, red } } }) => ({
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
      color: red,
    },
  },
}));

export const Price = styled.span(() => ({
  fontSize: '0.9rem',
  fontWeight: 500,
  paddingBottom: '0.5rem',
}));

export const Buttons = styled.div(({ theme: { palette: { lightGrey } } }) => ({
  alignItems: 'center',
  background: lightGrey,
  display: 'flex',
  '> *': {
    flex: 1,
  },
}));
