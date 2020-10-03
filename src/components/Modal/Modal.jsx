import React from 'react';

import * as Styled from './Modal.styled';

export const Modal = ({ children, onClose, size = 'medium' }) => (
  <>
    <Styled.Overlay onClick={onClose} />
    <Styled.ModalWrapper>
      <Styled.Modal size={size}>{children}</Styled.Modal>
    </Styled.ModalWrapper>
  </>
);
