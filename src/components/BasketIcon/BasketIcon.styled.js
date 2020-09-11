import styled from 'styled-components';

export const BasketIcon = styled.div(() => ({
  position: 'relative',
}));

export const Counter = styled.div(({ theme: { palette: { white } } }) => ({
  alignItems: 'center',
  background: 'crimson',
  border: `1px solid ${white}`,
  borderRadius: '0.5rem',
  color: white,
  display: 'flex',
  fontSize: '0.7rem',
  height: '1rem',
  justifyContent: 'center',
  minWidth: '1rem',
  padding: '0 0.25rem',
  position: 'absolute',
  right: 0,
  top: 0,
  transform: 'translate(50%, -50%)',
}));
