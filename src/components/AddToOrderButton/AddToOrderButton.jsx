import React from 'react';

import { useAuth } from '../../contexts';
import * as Styled from './AddToOrderButton.styled';

export const AddToOrderButton = () => {
  const { isAuthenticated, login } = useAuth();

  const handleClick = () => {
    if (!isAuthenticated) login();
  };

  return (
    <Styled.AddToOrderButton onClick={handleClick}>
      Add to order
    </Styled.AddToOrderButton>
  );
};
