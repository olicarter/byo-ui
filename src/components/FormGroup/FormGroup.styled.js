import styled from 'styled-components';

export const FormGroup = styled.div(({ margin }) => ({
  margin,
  '> *': {
    width: '100%',
  },
}));

export const Label = styled.div(() => ({
  margin: '0 0 0.5rem',
  whiteSpace: 'pre',
}));

export const Info = styled.p(
  ({
    color,
    theme: {
      palette,
      palette: { grey },
    },
  }) => ({
    color: palette[color] || grey,
    cursor: 'default',
    fontSize: '0.8rem',
    margin: '0 0 0.5rem',
    padding: 0,
  }),
);
