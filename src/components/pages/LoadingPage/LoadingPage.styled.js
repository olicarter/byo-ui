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

export const Path = styled.path(() => ({
  transitionDuration: '2500ms',
  ':nth-of-type(2)': {
    transitionDelay: '100ms',
  },
  ':nth-of-type(3)': {
    transitionDelay: '200ms',
  },
}));
