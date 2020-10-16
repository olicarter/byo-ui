import styled from 'styled-components';

export const Header = styled.header(({ theme: { palette: { primary } } }) => ({
  backdropFilter: 'blur(20px)',
  backgroundColor: primary,
  borderRadius: '0.5rem',
  padding: '2rem',
  width: '100%',
}));
