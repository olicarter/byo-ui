import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { parse } from 'qs';

import {
  AUTHENTICATE_USER,
  CREATE_USER,
  UNAUTHENTICATE_USER,
} from './AuthContext.gql';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { push } = useHistory();
  const { search } = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const useRegister = () =>
    useMutation(CREATE_USER, {
      onCompleted: ({ createUser }) => {
        const { id, email, name } = createUser || {};
        if (id)
          push({
            pathname: '/login',
            search: `new=true&name=${name}&email=${email}`,
          });
      },
    });

  const useLogin = () =>
    useMutation(AUTHENTICATE_USER, {
      onCompleted: ({ authenticateUserWithPassword }) => {
        const { token = null, item = null } =
          authenticateUserWithPassword || {};
        if (token) {
          localStorage.setItem('byo.token', token);
          setUser(item);
          setIsAuthenticated(true);
          const { from } = parse(search, { ignoreQueryPrefix: true });
          push(from);
        }
      },
    });

  const [unauthenticateUser] = useMutation(UNAUTHENTICATE_USER, {
    onCompleted: () => {
      localStorage.removeItem('byo.token');
      setIsAuthenticated(false);
    },
  });

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('byo.token'));
  }, []);

  const logout = async returnTo => {
    await unauthenticateUser();
    if (returnTo) push(returnTo);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        logout,
        useLogin,
        useRegister,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
