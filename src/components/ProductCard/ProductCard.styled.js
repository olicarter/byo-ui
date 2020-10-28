import styled from 'styled-components';
import { transparentize } from 'polished';

export const Content = styled.div(() => ({
  cursor: 'default',
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  // padding: '0.5rem',
}));

export const Header = styled.header(() => ({
  alignItems: 'center',
  display: 'flex',
  minHeight: '48px',
  justifyContent: 'space-between',
}));

export const Name = styled.h3(({ theme: { palette: { black } } }) => ({
  color: black,
  fontSize: '1.15rem',
  fontWeight: 700,
  margin: 0,
  padding: '0.5rem',
  textDecoration: 'none',
  textTransform: 'capitalize',
}));

export const InfoIcon = styled.div(
  ({
    theme: {
      palette: { black, primary },
    },
  }) => ({
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexBasis: '48px',
    flexShrink: 0,
    height: '48px',
    justifyContent: 'center',
    '> *': {
      color: black,
    },
    '@media (hover: hover) and (pointer: fine)': {
      ':hover > *': {
        color: primary,
      },
    },
  }),
);

export const Origin = styled.span(({ theme: { palette: { black } } }) => ({
  color: transparentize(0.33, black),
  display: 'flex',
  fontSize: '0.8rem',
  fontWeight: 400,
  lineHeight: 1,
  margin: 0,
  padding: '0 0.5rem 0.5rem',
  '> span': {
    marginLeft: '0.25rem',
  },
}));

export const Info = styled.p(({ theme: { palette: { black } } }) => ({
  color: transparentize(0.33, black),
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
      palette: { black },
    },
  }) => ({
    color: transparentize(0.33, black),
    whiteSpace: 'pre',
  }),
);
