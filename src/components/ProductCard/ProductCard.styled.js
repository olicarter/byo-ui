import styled from 'styled-components';

export const ProductCard = styled.div(() => ({
  alignSelf: 'flex-start',
  borderRadius: '0.5rem',
  boxShadow: '0 0 0.4rem 0 rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  transitionDuration: '200ms',
  '@media (hover: hover) and (pointer: fine)': {
    ':hover': {
      boxShadow: '0 0 1rem 0.1rem rgba(0, 0, 0, 0.1)',
    },
  },
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
  fontSize: '1.1rem',
  fontWeight: 700,
  margin: 0,
  paddingBottom: '0.5rem',
  textTransform: 'capitalize',
}));

export const Info = styled.p(({ theme: { palette: { grey } } }) => ({
  color: grey,
  fontSize: '0.8rem',
  margin: 0,
  paddingBottom: '0.5rem',
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

export const OrderSummary = styled.div(() => ({
  display: 'flex',
  fontWeight: 700,
  justifyContent: 'space-between',
  padding: '0.5rem',
}));

export const ContainersTotalPrice = styled.span(
  ({
    theme: {
      palette: { grey },
    },
  }) => ({
    color: grey,
    whiteSpace: 'pre',
  }),
);
