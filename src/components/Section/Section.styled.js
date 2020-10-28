import styled from 'styled-components';

export const Section = styled.section(({ margin, padding }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin,
  padding,
}));
