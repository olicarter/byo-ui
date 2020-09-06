import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAuth } from '../../contexts';
import * as Styled from './AddToOrderButton.styled';

export const AddToOrderButton = () => {
  const { isAuthenticated, login } = useAuth();
  const { push } = useHistory();
  const { pathname } = useLocation();

  const handleClick = () => {
    if (!isAuthenticated) login();
  };

  return (
    <Styled.AddToOrderButton onClick={handleClick}>
      Add to order
    </Styled.AddToOrderButton>
  );
};
