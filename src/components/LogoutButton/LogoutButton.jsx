import React from 'react';

import { Button } from '@components/Button';
import { useAuth } from '@contexts';

export const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Button backgroundColor="red" borderRadius flex={1} onClick={logout}>
      Logout
    </Button>
  );
};
