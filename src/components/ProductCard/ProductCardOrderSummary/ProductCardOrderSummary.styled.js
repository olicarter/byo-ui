import styled from 'styled-components';
import { transparentize } from 'polished';

export const OrderSummary = styled.div(({ theme: { palette: { black } } }) => ({
  color: transparentize(0.5, black),
  display: 'flex',
  fontWeight: 700,
  justifyContent: 'space-between',
  padding: '0.5rem',
}));

export const ContainersTotalPrice = styled.span(() => ({
  whiteSpace: 'pre',
}));
