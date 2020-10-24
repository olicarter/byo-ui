import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Content = styled.div(() => ({
  cursor: 'default',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  padding: '0.5rem',
}));

export const Name = styled(Link)(
  ({
    theme: {
      palette: { black, primary },
    },
  }) => ({
    color: black,
    fontSize: '1.1rem',
    fontWeight: 700,
    margin: 0,
    paddingBottom: '0.5rem',
    textDecoration: 'none',
    textTransform: 'capitalize',
    '@media (hover: hover) and (pointer: fine)': {
      ':hover': {
        color: primary,
      },
    },
  }),
);

export const Origin = styled.span(({ theme: { palette: { grey } } }) => ({
  color: grey,
  display: 'flex',
  fontSize: '0.75rem',
  fontWeight: 400,
  lineHeight: 1,
  margin: 0,
  paddingBottom: 0,
  textTransform: 'capitalize',
  '> span': {
    marginLeft: '0.25rem',
  },
}));

export const Info = styled.p(({ theme: { palette: { grey } } }) => ({
  color: grey,
  fontSize: '0.8rem',
  margin: 0,
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
