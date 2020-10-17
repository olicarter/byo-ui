import styled from 'styled-components';

export const Layout = styled.div(({ center }) => ({
  display: center ? 'flex' : 'auto',
  justifyContent: center ? 'center' : 'auto',
  padding: '1rem',
}));

export const MaxWidth = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '800px',
  width: '100%',
}));
