import styled from 'styled-components';

export const Center = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

export const Content = styled.div({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
});

export const Icon = styled.div({
  marginTop: '2rem',
});

export const SVG = styled.svg(({ theme: { palette: { black } } }) => ({
  clipRule: 'evenodd',
  fill: black,
  fillRule: 'evenodd',
  height: '5rem',
  overflow: 'visible',
  strokeLinejoin: 'round',
  strokeMiterlimit: 2,
}));

export const Path = styled.path({
  transitionDuration: '2500ms',
  ':nth-of-type(2)': {
    transitionDelay: '100ms',
  },
  ':nth-of-type(3)': {
    transitionDelay: '200ms',
  },
});

export const App = styled.div({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const Main = styled.div(({ theme: { maxWidth } }) => ({
  flex: 1,
  maxWidth,
  width: '100%',
}));

export const Flex = styled.div({
  display: 'flex',
  flexDirection: 'row',
  minWidth: '50%',
  marginTop: '20px',
});

export const CallToActionButtonPortal = styled.div({
  display: 'contents',
});
