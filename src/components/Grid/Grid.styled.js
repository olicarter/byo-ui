import styled from 'styled-components';

export const Grid = styled.div(() => ({
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(calc(120px + 5vw), 1fr))',
  padding: '1rem',
}));
