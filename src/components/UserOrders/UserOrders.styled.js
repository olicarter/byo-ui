import styled from 'styled-components';

export const UserOrders = styled.div(() => ({
  padding: '1rem',
}));

export const Column = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexBasis: '100%',
  flex: '1',
  maxWidth: '600px',
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

export const OrderItemHeader = styled(Row)(() => ({
  fontSize: '1rem',
  fontWeight: 600,
}));

export const Date = styled.span(({ theme: { palette: { grey } } }) => ({
  color: grey,
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
