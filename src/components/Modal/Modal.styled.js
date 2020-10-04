import styled from 'styled-components';

export const Overlay = styled.div(({ theme: { palette: { black } } }) => ({
  backgroundColor: black,
  bottom: 0,
  left: 0,
  opacity: 0.5,
  position: 'fixed',
  right: 0,
  top: 0,
  zIndex: 2,
}));

export const ModalWrapper = styled.div(({ theme: { palette: { white } } }) => ({
  alignItems: 'center',
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
}));

export const Modal = styled.div(({ size, theme: { palette: { white } } }) => ({
  backgroundColor: white,
  borderRadius: '0.5rem',
  get maxWidth() {
    switch (size) {
      case 'medium':
        return '480px';
      default:
        return 'auto';
    }
  },
  width: '100%',
  zIndex: 3,
}));
