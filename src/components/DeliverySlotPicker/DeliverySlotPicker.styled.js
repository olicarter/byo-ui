import styled from 'styled-components';
import { darken } from 'polished';

export const DeliverySlotPicker = styled.div(() => ({
  borderRadius: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

export const Header = styled.header(() => ({
  display: 'flex',
}));

export const Column = styled.div(({ pointerEvents = 'all' }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  pointerEvents,
}));

export const Cell = styled.li(({ theme: { palette: { primary } } }) => ({
  alignItems: 'center',
  backgroundColor: 'whitesmoke',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '0.8rem',
  fontWeight: 600,
  height: '2rem',
  justifyContent: 'center',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  ':first-of-type': {
    backgroundColor: primary,
  },
  '@media (hover: hover) and (pointer: fine)': {
    ':hover': {
      backgroundColor: darken(0.1, 'whitesmoke'),
    },
  },
}));

export const HeaderCell = styled(Cell)(() => ({
  pointerEvents: 'none',
}));

export const Row = styled.div(() => ({
  display: 'flex',
  height: '2rem',
}));

export const Time = styled.span(() => ({}));
