import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '@contexts';

export const ProtectedRoute = ({ children, path, ...args }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route path={path} {...args}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect to={{ pathname: '/login', search: `from=${path}` }} />
      )}
    </Route>
  );
};
