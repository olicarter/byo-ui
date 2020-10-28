import styled from 'styled-components';

export const Layout = styled.div(({ center }) => ({
  display: center ? 'flex' : 'auto',
  justifyContent: center ? 'center' : 'auto',
}));

export const MaxWidth = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  // maxWidth: '1280px',
  width: '100%',
}));
