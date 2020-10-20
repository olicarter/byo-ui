import styled from 'styled-components';

export const App = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const MaxWidthLayout = styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
  padding: '1rem',
}));

export const MaxWidth = styled.div(() => ({
  maxWidth: '800px',
  width: '100%',
}));

export const Main = styled.div(() => ({
  flex: 1,
}));
