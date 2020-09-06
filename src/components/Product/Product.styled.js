import styled from 'styled-components';

export const Product = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const Image = styled.img(() => ({
  objectFit: 'cover',
  width: '100%',
}));

export const Header = styled.header(() => ({
  display: 'flex',
  flex: 1,
  fontSize: '1.1rem',
  fontWeight: 600,
  justifyContent: 'space-between',
  padding: '0 0 1rem',
  textTransform: 'capitalize',
  '> :first-child': {
    paddingRight: '1rem',
  },
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
