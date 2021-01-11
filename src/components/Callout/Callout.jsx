import React from 'react';
import Icon from '@mdi/react';
import { mdiInformationOutline } from '@mdi/js';

import * as Styled from './Callout.styled';

export const Callout = ({ children }) => {
  if (!children) return null;

  return (
    <Styled.Callout>
      <Styled.Item>
        <Icon path={mdiInformationOutline} size={1} />
      </Styled.Item>
      <Styled.Item>{children}</Styled.Item>
    </Styled.Callout>
  );
};
