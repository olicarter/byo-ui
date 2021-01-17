import styled from 'styled-components';

export const LoadingPage = styled.div(() => ({
  alignItems: 'center',
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
}));

export const Content = styled.div(() => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
}));

export const Icon = styled.div(() => ({
  marginTop: '2rem',
}));

export const SVG = styled.svg(({ theme: { palette: { black } } }) => ({
  clipRule: 'evenodd',
  fill: black,
  fillRule: 'evenodd',
  height: '5rem',
  overflow: 'visible',
  strokeLinejoin: 'round',
  strokeMiterlimit: 2,
}));

export const Path = styled.path(
  ({
    theme: {
      palette: { red, teal, yellow },
    },
  }) => ({
    fill: teal,
    transitionDuration: '2500ms',
    ':nth-of-type(2)': {
      fill: yellow,
      transitionDelay: '100ms',
    },
    ':nth-of-type(3)': {
      fill: red,
      transitionDelay: '200ms',
    },
  }),
);
