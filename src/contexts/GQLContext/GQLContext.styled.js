import styled from 'styled-components';
import { transparentize } from 'polished';

export const GlobalLoadingIndicator = styled.div(
  ({
    loading,
    theme: {
      palette: { white },
    },
  }) => ({
    background: transparentize(0.5, white),
    bottom: 0,
    left: 0,
    opacity: loading ? 1 : 0,
    pointerEvents: loading ? 'all' : 'none',
    position: 'fixed',
    right: 0,
    top: 0,
    transitionDuration: '500ms',
    zIndex: 3,
  }),
);
