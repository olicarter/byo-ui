import styled from 'styled-components';

export const SubTitle = styled.h3(
  ({
    margin,
    theme: {
      palette: { black },
    },
  }) => ({
    color: black,
    fontSize: '1.6rem',
    margin,
    padding: 0,
  }),
);
