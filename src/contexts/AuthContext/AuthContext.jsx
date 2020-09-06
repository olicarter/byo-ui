import React, { createContext, useContext, useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.init();
  }, []);

  const login = callback => {
    setIsAuthenticated(true);
    netlifyIdentity.open();
    netlifyIdentity.on('login', authenticatedUser => {
      setUser(authenticatedUser);
      callback(authenticatedUser);
    });
  };

  const logout = callback => {
    setIsAuthenticated(false);
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      setUser(null);
      callback();
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
