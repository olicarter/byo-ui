import styled from 'styled-components';

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
  width: '100%',
}));

export const OrderItemHeader = styled(Row)(() => ({
  fontWeight: 700,
}));

export const Name = styled.span(() => ({
  height: '16px',
  lineHeight: '18px',
  width: '1000px',
}));

export const OrderItemProduct = styled.span(
  ({
    theme: {
      palette: { grey },
    },
  }) => ({
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    ':after': {
      color: grey,
      content:
        '"................................................................................................................................................................................................................."',
    },
  }),
);
