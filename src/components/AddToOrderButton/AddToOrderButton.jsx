import React, { useEffect } from 'react';

import { useAuth } from '../../contexts';
import * as Styled from './AddToOrderButton.styled';

export const AddToOrderButton = () => {
  const x = useAuth();
  const { isAuthenticated, login } = x;

  useEffect(() => {}, []);

  const handleClick = () => {
    if (!isAuthenticated) return login();
  };

  return (
    <Styled.AddToOrderButton onClick={handleClick}>
      Add to order
    </Styled.AddToOrderButton>
  );
};
