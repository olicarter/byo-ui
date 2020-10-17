import styled from 'styled-components';

export const Grid = styled.div(() => ({
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
}));
