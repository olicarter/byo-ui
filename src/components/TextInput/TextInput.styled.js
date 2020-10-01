import styled from 'styled-components';

export const TextInput = styled.input(
  ({
    theme: {
      palette: { black, white },
    },
  }) => ({
    background: white,
    border: 'none',
    borderBottom: `2px solid ${black}`,
    fontSize: '1rem',
    fontWeight: 500,
    outline: 'none',
    padding: '0.5rem 0',
  }),
);
