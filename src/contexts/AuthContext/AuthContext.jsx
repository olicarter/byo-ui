import React, { createContext, useContext, useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = callback => {
    netlifyIdentity.open();
    netlifyIdentity.on('login', authenticatedUser => {
      setIsAuthenticated(true);
      setUser(authenticatedUser);
      if (typeof callback === 'function') callback(authenticatedUser);
    });
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
    netlifyIdentity.on('init', user => {
      setIsAuthenticated(!!user);
    });
    netlifyIdentity.init();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
