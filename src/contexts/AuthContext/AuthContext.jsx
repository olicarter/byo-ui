import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import netlifyIdentity from 'netlify-identity-widget';
import GoTrue from 'gotrue-js';

import { CREATE_USER, GET_USERS_BY_NETLIFY_ID } from './AuthContext.gql';
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
  const [user, setUser] = useState({});
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const { id: netlifyUserId } = user || {};

  const [getUser, { called: getUserCalled }] = useLazyQuery(
    GET_USERS_BY_NETLIFY_ID,
    {
      variables: { netlifyId: netlifyUserId },
    },
  );

  useEffect(() => {
    if (!getUserCalled && netlifyUserId) getUser();
  }, [getUser, getUserCalled, netlifyUserId]);

  const openLoginModal = () => {
    setLoginModalVisible(true);
  };

  const closeLoginModal = () => {
    setLoginModalVisible(false);
  };

  const login = async (email, password) => {
    try {
      const loginRes = await auth.login(email, password, true);
      if (loginRes) setIsAuthenticated(true);
      return loginRes;
    } catch (error) {
      return { error };
    }
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
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    setIsAuthenticated(!!auth.currentUser());
  }, []);

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
