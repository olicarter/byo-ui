import styled from 'styled-components';
import { readableColor } from 'polished';

export const Callout = styled.div(
  ({
    theme: {
      palette: { black, primary, white },
    },
  }) => ({
    backgroundColor: primary,
    borderRadius: '0.5rem',
    color: readableColor(primary, white, black),
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
