import React from 'react';
import { createPortal } from 'react-dom';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

import { useApp } from '@contexts';

import * as Styled from './FloatingButton.styled';

export const FloatingButton = ({
  backgroundColor = 'primary',
  borderRadius = true,
  children,
  disabled = false,
  flex = 1,
  loading = false,
  onClick,
  type = 'button',
}) => {
  const { portalNodes } = useApp();

  if (!portalNodes.floatingButton.current) return null;

  return createPortal(
    <Styled.FloatingButtonWrapper>
      <Styled.FloatingButton
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        disabled={disabled || loading}
        flex={flex}
        onClick={onClick}
        type={type}
      >
        {loading ? (
          <Icon path={mdiLoading} rotate={90} spin size={0.8} />
        ) : (
          children
        )}
      </Styled.FloatingButton>
    </Styled.FloatingButtonWrapper>,
    portalNodes.floatingButton.current,
  );
};
