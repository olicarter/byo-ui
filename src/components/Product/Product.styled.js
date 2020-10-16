import styled from 'styled-components';
import MdiIcon from '@mdi/react';

export const Product = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
}));

export const Info = styled.h3(() => ({
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

export const Icon = styled(MdiIcon)(() => ({
  flexShrink: 0,
}));
