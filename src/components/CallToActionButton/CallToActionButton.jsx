import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

import { useApp } from '@contexts';

import * as Styled from './CallToActionButton.styled';

export const CallToActionButton = ({
  backgroundColor = 'primary',
  borderRadius = true,
  children,
  disabled = false,
  flex = 1,
  isSticky = true,
  loading = false,
  onClick,
  type = 'button',
}) => {
  const { portalRefs } = useApp();

  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    if (portalRefs.callToActionButton.current) {
      setPortalNode(portalRefs.callToActionButton.current);
    }
  }, [portalRefs]);

  if (!portalNode) return null;

  return createPortal(
    <Styled.CallToActionButtonWrapper isSticky={isSticky}>
      <Styled.CallToActionButton
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
      </Styled.CallToActionButton>
    </Styled.CallToActionButtonWrapper>,
    portalNode,
  );
};
