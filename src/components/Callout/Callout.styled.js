import styled from 'styled-components';

export const Callout = styled.div(
  ({
    theme: {
      palette: { primary, readableColor },
    },
  }) => ({
    backgroundColor: primary,
    borderRadius: '0.5rem',
    color: readableColor(primary),
    display: 'flex',
    fontWeight: 600,
    lineHeight: 1.25,
    padding: '0.5rem',
  }),
);

export const Item = styled.div({
  alignItems: 'center',
  display: 'flex',
  padding: '0.5rem',
});
