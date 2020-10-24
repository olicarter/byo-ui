import styled from 'styled-components';

export const Column = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexBasis: '100%',
  flex: '1',
  width: '100%',
}));

export const CardContent = styled.div(() => ({
  cursor: 'default',
  padding: '1rem',
}));

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

export const Header = styled(Row)(() => ({
  fontSize: '1.2rem',
  fontWeight: 600,
}));

export const OrderId = styled.span(() => ({
  textTransform: 'uppercase',
}));

export const OrderItemHeader = styled(Row)(() => ({
  fontWeight: 700,
}));

export const Status = styled.span(({ theme: { palette: { primary } } }) => ({
  color: primary,
  fontWeight: 600,
}));

export const Name = styled.span(() => ({
  height: '16px',
  lineHeight: '18px',
  width: '1000px',
}));

export const Quantity = styled.span(() => ({
  width: '162px',
  height: '13px',
  lineHeight: '13px',
}));
