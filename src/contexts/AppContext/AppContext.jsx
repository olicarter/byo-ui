import React, { createContext, useContext, useRef } from 'react';

export const AppContext = createContext({});

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const floatingButtonPortalNode = useRef(null);

  return (
    <AppContext.Provider
      value={{
        portalNodes: {
          floatingButton: floatingButtonPortalNode,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
