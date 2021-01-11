import styled from 'styled-components';

export const Section = styled.section(({ margin, padding }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin,
  padding,
  '.Section': {
    padding: 0,
    ':first-of-type': {
      margin: 0,
    },
  },
}));
