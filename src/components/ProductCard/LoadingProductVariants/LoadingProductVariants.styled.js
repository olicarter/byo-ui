import styled from 'styled-components';

export const ProductVariant = styled.div({
  display: 'flex',
  minHeight: '46px',
});

export const Info = styled.div(({ theme: { palette: { black } } }) => ({
  color: black,
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  padding: `0.5rem 0`,
}));

export const Quantity = styled.div(
  ({
    theme: {
      palette: { primary },
    },
    quantity,
  }) => ({
    alignItems: 'center',
    color: quantity ? primary : 'inherit',
    display: 'flex',
    fontSize: '0.8rem',
    fontWeight: 700,
    opacity: 0.5,
    userSelect: 'none',
  }),
);
