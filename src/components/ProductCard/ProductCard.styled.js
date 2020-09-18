import styled from 'styled-components';

export const ProductCard = styled.div(() => ({
  borderRadius: '1rem',
  boxShadow: '0 0 0.3rem 0.05rem rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  transitionDuration: '200ms',
  '@media (hover: hover) and (pointer: fine)': {
    ':hover': {
      boxShadow: '0 0 0.5rem 0.05rem rgba(0, 0, 0, 0.15)',
    },
  },
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
  cursor: 'default',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  padding: '0.5rem',
}));

export const Name = styled.span(({ theme: { palette: { black } } }) => ({
  color: black,
  fontSize: '1rem',
  fontWeight: 700,
  margin: 0,
  paddingBottom: '0.5rem',
  textTransform: 'capitalize',
  textDecoration: 'none',
}));

export const Price = styled.span(() => ({
  fontSize: '0.8rem',
  fontWeight: 500,
  paddingBottom: '0.5rem',
}));

export const Buttons = styled.div(() => ({
  alignItems: 'center',
  display: 'flex',
  fontSize: '0.8rem',
  '> *': {
    flex: 1,
  },
}));
