import styled from 'styled-components';

export const FormGroup = styled.div(({ flex, horizontal, margin }) => ({
  display: 'flex',
  flex,
  flexDirection: horizontal ? 'row' : 'column',
  margin,
  '> *': {
    width: '100%',
  },
  '> *:not(:first-child)': {
    marginLeft: horizontal ? '1rem' : 0,
  },
}));

export const Label = styled.div(() => ({
  margin: '0 0 0.25rem',
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
