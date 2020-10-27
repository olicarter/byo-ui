import styled from 'styled-components';

export const Section = styled.section(({ padding }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '1rem 0 0',
  padding,
}));
