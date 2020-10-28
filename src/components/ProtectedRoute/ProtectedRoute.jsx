import React from 'react';
import { Route, useHistory, useRouteMatch } from 'react-router-dom';

export const ProtectedRoute = ({ children, path, ...args }) => {
  const { push } = useHistory();

  if (useRouteMatch(path) && !localStorage.getItem('byo.token')) {
    push({ pathname: '/login', search: `from=${path}` });
    return null;
  }

  return (
    <Route path={path} {...args}>
      {children}
    </Route>
  );
};
