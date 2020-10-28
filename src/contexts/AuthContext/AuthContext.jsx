import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { parse } from 'qs';

import { AUTHENTICATE_USER, UNAUTHENTICATE_USER } from './AuthContext.gql';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { push } = useHistory();
  const { search } = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [authenticateUser] = useMutation(AUTHENTICATE_USER, {
    onCompleted: ({ authenticateUserWithPassword }) => {
      const { token = null, item = null } = authenticateUserWithPassword || {};
      setToken(token);
      setUser(item);
    },
  });

  const [unauthenticateUser] = useMutation(UNAUTHENTICATE_USER, {
    onCompleted: ({ unauthenticateUser }) => {
      const { success } = unauthenticateUser || {};
      if (success) {
        setToken(null);
      }
    },
  });

  useEffect(() => {
    setToken(localStorage.getItem('byo.token') || null);
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('byo.token', token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('byo.token');
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    await authenticateUser({ variables: { email, password } });
    const { from } = parse(search, { ignoreQueryPrefix: true });
    push(from);
  };

  const logout = async returnTo => {
    await unauthenticateUser();
    if (returnTo) push(returnTo);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
