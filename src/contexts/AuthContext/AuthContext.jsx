import React, { createContext, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { stringify, parse } from 'qs';

import {
  AUTHENTICATE_USER,
  CREATE_USER,
  GET_AUTHENTICATED_USER,
  UNAUTHENTICATE_USER,
} from './AuthContext.gql';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { push } = useHistory();
  const { search } = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

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
          const { from, ...restQuery } = parse(search, {
            ignoreQueryPrefix: true,
          });
          push({
            pathname: from,
            search: stringify(restQuery, {
              arrayFormat: 'brackets',
              encode: false,
            }),
          });
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

  useEffect(() => {
    if (authenticatedUser === null) {
      localStorage.removeItem('byo.token');
      setIsAuthenticated(false);
    }
  }, [authenticatedUser]);

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
