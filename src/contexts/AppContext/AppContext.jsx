import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export const AppContext = createContext({});

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [portalRefs, setPortalRefs] = useState({});

  const callToActionButtonRef = useRef(null);

  useEffect(() => {
    setPortalRefs({ callToActionButton: callToActionButtonRef });
  }, [callToActionButtonRef]);

  return (
    <AppContext.Provider value={{ portalRefs }}>{children}</AppContext.Provider>
  );
};
