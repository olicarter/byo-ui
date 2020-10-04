import styled from 'styled-components';

export const Label = styled.label(({ theme: { palette: { black } } }) => ({
  color: black,
  fontSize: '1.2rem',
  fontWeight: 700,
}));
