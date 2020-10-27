import styled from 'styled-components';
import MdiIcon from '@mdi/react';

export const Content = styled.div(() => ({
  cursor: 'default',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  padding: '0.5rem',
}));

export const Header = styled.header(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: '0.5rem',
}));

export const Name = styled.h3(({ theme: { palette: { black } } }) => ({
  color: black,
  fontSize: '1.15rem',
  fontWeight: 700,
  margin: 0,
  padding: 0,
  textDecoration: 'none',
  textTransform: 'capitalize',
}));

export const Icon = styled(MdiIcon)(
  ({
    theme: {
      palette: { black, primary },
    },
  }) => ({
    color: black,
    cursor: 'pointer',
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
  fontSize: '0.8rem',
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
