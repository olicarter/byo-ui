import React from 'react';

import * as Styled from './Modal.styled';

export const Modal = ({ children, size = 'medium' }) => (
  <>
    <Styled.Overlay />
    <Styled.ModalWrapper>
      <Styled.Modal size={size}>{children}</Styled.Modal>
    </Styled.ModalWrapper>
  </>
);
