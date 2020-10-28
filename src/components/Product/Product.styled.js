import styled from 'styled-components';
import MdiIcon from '@mdi/react';

export const Centered = styled.div(() => ({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
}));

export const Product = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
}));

export const Section = styled.h3(() => ({
  alignItems: 'flex-start',
  display: 'flex',
  fontSize: '1.25rem',
  fontWeight: 700,
  lineHeight: '2rem',
  margin: '1rem 0',
  '> :last-child': {
    marginLeft: '1rem',
  },
}));

export const Info = styled.span(({ theme: { palette: { black } } }) => ({
  color: black,
  fontWeight: 600,
}));

export const Icon = styled(MdiIcon)(({ theme: { palette: { black } } }) => ({
  color: black,
  flexShrink: 0,
}));

export const SectionTitle = styled.h3(({ theme: { palette: { black } } }) => ({
  color: black,
  fontSize: '1.5rem',
  fontWeight: 700,
  margin: '0 0 0.5rem',
  padding: 0,
}));
