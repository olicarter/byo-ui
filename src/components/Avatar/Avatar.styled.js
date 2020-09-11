import styled from 'styled-components';

export const Avatar = styled.div(({ theme: { palette: { red, white } } }) => ({
  alignItems: 'center',
  background: red,
  borderRadius: '1rem',
  color: white,
  display: 'flex',
  height: '2rem',
  justifyContent: 'center',
  width: '2rem',
}));
