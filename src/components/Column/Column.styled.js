import styled from 'styled-components';

export const Column = styled.div(({ flex, order }) => ({
  flex,
  margin: '0.5rem',
  order,
  // ':not(:first-of-type)': {
  //   marginLeft: '1rem',
  // },
}));
