import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import netlifyIdentity from 'netlify-identity-widget';
import GoTrue from 'gotrue-js';

import { CREATE_USER, GET_USER } from './AuthContext.gql';
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

  const { id: netlifyUserId, email } = user || {};

  const [createUser] = useMutation(CREATE_USER, {
    variables: {
      email,
      firstName: 'firstName',
      lastName: 'lastName',
      netlifyId: netlifyUserId,
    },
  });

  const [getUser, { called: getUserCalled }] = useLazyQuery(GET_USER, {
    onCompleted: ({ allUsers }) => {
      const [user] = allUsers;
      const { id } = user || {};
      if (!id) return createUser();
    },
    variables: { netlifyId: netlifyUserId },
  });

  useEffect(() => {
    if (!getUserCalled && netlifyUserId) getUser();
  }, [getUser, getUserCalled, netlifyUserId]);

  const login = callback => {
    setLoginModalVisible(true);
    // netlifyIdentity.open();
    // netlifyIdentity.on('login', authenticatedUser => {
    //   console.log('authenticatedUser', authenticatedUser);
    //   setIsAuthenticated(true);
    //   setUser(authenticatedUser);
    //   if (typeof callback === 'function') callback(authenticatedUser);
    // });
  };

  const logout = callback => {
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      setIsAuthenticated(false);
      setUser(null);
      if (typeof callback === 'function') callback();
    });
  };

  useEffect(() => {
    netlifyIdentity.on('init', user => setIsAuthenticated(!!user));
    netlifyIdentity.init();
  }, []);

  useEffect(() => {
    if (isAuthenticated) setUser(netlifyIdentity.currentUser());
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ auth, isAuthenticated, login, logout, user }}
    >
      {loginModalVisible ? <LoginModal /> : null}
      {children}
    </AuthContext.Provider>
  );
};
