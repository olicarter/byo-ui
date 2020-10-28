import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Context, Auth0Provider } from '@auth0/auth0-react';

export const useAuth = () => useContext(Auth0Context);

export const AuthProvider = ({ children }) => {
  const { push } = useHistory();

  return (
    <Auth0Provider
      domain="byo.eu.auth0.com"
      clientId="dx9wm0I63YOXe2R2uUkF6HPO0Yw8ZupM"
      redirectUri={window.location.origin}
      onRedirectCallback={({ returnTo }) => {
        if (returnTo) push(returnTo);
      }}
    >
      {children}
    </Auth0Provider>
  );
};
