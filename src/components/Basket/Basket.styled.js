import styled from 'styled-components';

export const TotalContainerPrice = styled.span(
  ({
    theme: {
      palette: { grey },
    },
  }) => ({
    color: grey,
  }),
);
