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

export const Main = styled.div(() => ({
  flex: 1,
}));

export const Flex = styled.div(() => ({
  display: 'flex',
  flexDirection: 'row',
  minWidth: '50%',
  marginTop: '20px',
}));
