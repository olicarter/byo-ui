import styled from 'styled-components';

export const Column = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  flexBasis: '100%',
  flex: '1',
  maxWidth: '400px',
}));

export const Row = styled.div(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '15px',
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
