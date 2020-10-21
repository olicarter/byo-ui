import styled from 'styled-components';

export const Grid = styled.div(({ gridTemplateColumns }) => ({
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns,
}));
