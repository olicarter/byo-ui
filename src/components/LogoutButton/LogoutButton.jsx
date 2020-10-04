import React from 'react';

import { useAuth } from '../../contexts';
import { Button } from '../Button';

export const LogoutButton = () => {
  const { logout } = useAuth();

  return <Button onClick={logout}>Logout</Button>;
};
