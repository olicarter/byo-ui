import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import GoTrue from 'gotrue-js';

import { GET_USERS_BY_NETLIFY_ID } from './AuthContext.gql';
import { LoginModal } from '../../components';

const { REACT_APP_NETLIFY_IDENTITY_API_URL } = process.env;

const auth = new GoTrue({
  APIUrl: REACT_APP_NETLIFY_IDENTITY_API_URL,
  setCookie: true, // required for "remember me" functionality
});

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const { sub: auth0Id } = user || {};

  const [getUsersByAuth0Id] = useLazyQuery(GET_USERS_BY_NETLIFY_ID, {
    variables: { auth0Id },
  });

  useEffect(() => {
    if (auth0Id) getUsersByAuth0Id();
  }, [auth0Id, getUsersByAuth0Id]);

  const openLoginModal = () => {
    setLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  const login = (email, password) => {
    // authenticateUser({ variables: { email, password } });
  };

  const signup = async (email, password) => {
    try {
      return auth.signup(email, password);
    } catch (error) {
      return { error };
    }
  };

  const logout = async () => {
    try {
      await user.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    setUser(auth.currentUser());
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        closeLoginModal,
        errorMessages: {
          EMAIL_NOT_CONFIRMED: 'invalid_grant: Email not confirmed',
          INVALID_EMAIL_OR_PASSWORD:
            'invalid_grant: No user found with that email, or password invalid.',
        },
        isAuthenticated,
        login,
        logout,
        openLoginModal,
        signup,
        user,
      }}
    >
      {loginModalVisible ? <LoginModal /> : null}
      {children}
    </AuthContext.Provider>
  );
};
