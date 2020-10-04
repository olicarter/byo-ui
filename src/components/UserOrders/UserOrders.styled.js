import styled from 'styled-components';

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
  fontSize: '15px',
  fontWeight: bold ? 600 : 'normal',
  justifyContent: 'space-between',
  width: '100%',
}));

export const Header = styled(Row)(() => ({
  fontSize: '1.5rem',
  '> span': {
    fontWeight: 600,
  },
}));

export const Date = styled.span(({ theme: { palette: { grey } } }) => ({
  color: grey,
}));

export const Name = styled.span(() => ({
  width: '1000px',
  height: '16px',
  lineHeight: '18px',
}));

export const Quantity = styled.span(() => ({
  width: '162px',
  height: '13px',
  lineHeight: '13px',
}));
