import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { parse } from 'qs';

import { AUTHENTICATE_USER } from './AuthContext.gql';

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
      const { from } = parse(search, { ignoreQueryPrefix: true });
      if (from) push(from);
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
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [token]);

  const login = (email, password) => {
    authenticateUser({ variables: { email, password } });
  };

  const logout = () => {};

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
