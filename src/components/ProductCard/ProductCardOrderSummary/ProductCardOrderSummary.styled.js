import styled from 'styled-components';

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
