import React from 'react';

import { useAuth } from '../../contexts';
import * as Styled from './Avatar.styled';

export const Avatar = () => {
  const { user } = useAuth();
  const { user_metadata: { full_name: fullName = '' } = {} } = user || {};
  return <Styled.Avatar className="Avatar">{fullName.charAt(0)}</Styled.Avatar>;
};
