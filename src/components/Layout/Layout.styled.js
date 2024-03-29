import styled from 'styled-components';

export const Layout = styled.div(({ center }) => ({
  display: center ? 'flex' : 'auto',
  justifyContent: center ? 'center' : 'auto',
}));

export const MaxWidth = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});
