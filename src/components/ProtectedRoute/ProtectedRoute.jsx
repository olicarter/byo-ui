import React from 'react';
import { Route, useHistory } from 'react-router-dom';

export const ProtectedRoute = ({ children, ...args }) => {
  const { push } = useHistory();

  if (!localStorage.getItem('byo.token')) {
    push('/login');
    return null;
  }

  return <Route {...args}>{children}</Route>;
};
