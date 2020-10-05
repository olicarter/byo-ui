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
    maxWidth: '250px',
  }),
);

export const Form = styled.form(({ theme: { palette: { white } } }) => ({
  padding: '1rem',
  marginBottom: '100px',
}));

export const Heading = styled.h3(({ theme: { palette: { black } } }) => ({
  color: black,
  cursor: 'default',
  fontSize: '1.8rem',
  fontWeight: 700,
  margin: 0,
  padding: 0,
}));

export const FormGroup = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '10px',
  float: 'left',
}));
