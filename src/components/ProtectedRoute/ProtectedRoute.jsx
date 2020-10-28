import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

export const ProtectedRoute = ({ component, ...args }) => (
  <Route
    {...args}
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <p>loading...</p>,
    })}
  />
);
