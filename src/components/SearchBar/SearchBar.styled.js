import styled from 'styled-components';

export const SearchBar = styled.div(({ theme: { palette: { black } } }) => ({
  color: black,
  display: 'flex',
}));

export const IconWrapper = styled.div({
  padding: '1rem',
});

export const Input = styled.input(({ theme: { palette: { black } } }) => ({
  background: 'none',
  border: 'none',
  color: black,
  fontSize: '1rem',
  fontWeight: 700,
  outline: 'none',
  padding: '1rem 0',
  width: '100%',
}));
