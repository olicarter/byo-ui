import styled from 'styled-components';

export const Products = styled.div(() => ({
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  padding: '1rem',
}));
