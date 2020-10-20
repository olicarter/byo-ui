import styled from 'styled-components';

export const Column = styled.div(({ flex, order }) => ({
  flex,
  order,
  ':not(:first-of-type)': {
    marginLeft: '1rem',
  },
}));
