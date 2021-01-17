import styled from 'styled-components';
import { transparentize } from 'polished';

export const Section = styled.section(() => ({
  ':not(:first-of-type)': {
    marginTop: '0.5rem',
  },
}));

export const Row = styled.div(({ bold }) => ({
  display: 'flex',
  flexDirection: 'row',
  fontSize: '0.9rem',
  fontWeight: bold ? 700 : 'normal',
  justifyContent: 'space-between',
  padding: '0.125rem 0',
  width: '100%',
}));

export const OrderItemHeader = styled(Row)(() => ({
  fontWeight: 700,
}));

export const Name = styled.span(() => ({
  fontSize: '1rem',
}));

export const OrderItemProduct = styled.span(
  ({
    theme: {
      palette: { black },
    },
  }) => ({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    ':after': {
      color: transparentize(0.5, black),
      content:
        '".............................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................."',
    },
  }),
);

export const Price = styled.span({
  flexShrink: 0,
});

export const GreySpan = styled.span(({ theme: { palette: { black } } }) => ({
  color: transparentize(0.5, black),
}));

export const ProductVariantName = styled.span(
  ({
    theme: {
      palette: { primary },
    },
  }) => ({
    color: primary,
    flexShrink: 0,
    fontSize: '0.8rem',
    whiteSpace: 'pre',
  }),
);

export const BrandName = styled.span(
  ({
    loading,
    selected,
    theme: {
      palette: { black, focus, primary },
    },
    to,
  }) => ({
    color: selected ? primary : transparentize(0.33, black),
    cursor: to ? 'pointer' : 'default',
    fontSize: '0.75rem',
    fontWeight: 400,
    height: '16px',
    margin: 0,
    outline: 'none',
    padding: 0,
    textDecoration: 'none',
    ...(to
      ? {
          ':focus': { color: focus },
          '@media (hover: hover) and (pointer: fine)': {
            ':hover': {
              color: loading ? transparentize(0.33, black) : focus,
            },
          },
        }
      : {}),
  }),
);
