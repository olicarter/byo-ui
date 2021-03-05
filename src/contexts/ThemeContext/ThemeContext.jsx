import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  createGlobalStyle,
  ThemeProvider as SCThemeProvider,
} from 'styled-components';
import { readableColor } from 'polished';
import { useMedia, useMediaLayout } from 'use-media';
import { gql, useQuery } from '@apollo/client';

const GET_PRIMARY_COLOR = gql`
  query {
    allSettings {
      id
      primaryColor
    }
  }
`;

const commonProperties = {
  maxWidth: '1200px',
};

const Global = createGlobalStyle(({ theme: { palette: { white } } }) => ({
  '*': {
    boxSizing: 'border-box',
  },
  body: {
    background: white,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    margin: 0,
    mozOsxFontSmoothing: 'grayscale',
    transitionTimingFunction: 'ease-out',
    webkitFontSmoothing: 'antialiased',
  },
}));

export const ThemeContext = createContext({});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const blue = 'hsl(210, 100%, 60%)';
  const teal = '#1d7771';
  const yellow = 'hsl(43, 98%, 55%)';
  const pink = '#f0bac7';

  const {
    data: { allSettings: [{ primaryColor: primary = teal } = {}] = [] } = {},
  } = useQuery(GET_PRIMARY_COLOR);

  const themes = useMemo(
    () => ({
      dark: {
        ...commonProperties,
        name: 'dark',
        palette: {
          black: 'hsl(40, 100%, 97%)',
          blue,
          cream: '#ddd5c4',
          focus: yellow,
          green: 'hsl(140, 66%, 44%)',
          grey: '#999',
          lightGrey: 'hsl(0, 0%, 95%)',
          pink,
          primary,
          readableColor: color =>
            readableColor(color, '#111', 'hsl(40, 100%, 97%)'),
          red: 'hsl(350, 75%, 50%)',
          teal,
          white: '#111',
          yellow,
        },
      },
      light: {
        ...commonProperties,
        name: 'light',
        palette: {
          black: 'black',
          blue,
          cream: '#ddd5c4',
          focus: yellow,
          green: 'hsl(140, 66%, 47%)',
          grey: '#999',
          lightGrey: 'hsl(0, 0%, 95%)',
          pink,
          primary,
          readableColor: color => readableColor(color, 'black', 'white'),
          red: 'hsl(350, 75%, 50%)',
          teal,
          white: 'white',
          yellow,
        },
      },
    }),
    [primary],
  );

  const isDesktop = useMediaLayout({ minWidth: '680px' });

  const prefersDarkTheme = useMedia({ prefersColorScheme: 'dark' });

  const getTheme = useCallback(() => {
    if (localStorage.getItem('byo.theme')) {
      return themes[localStorage.getItem('byo.theme')];
    }
    return themes.light;
  }, [themes]);

  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    setTheme(getTheme());
  }, [getTheme, prefersDarkTheme]);

  const toggleTheme = () => {
    const newThemeName = theme.name === 'dark' ? 'light' : 'dark';
    setTheme(themes[newThemeName]);
    localStorage.setItem('byo.theme', newThemeName);
  };

  return (
    <ThemeContext.Provider value={{ ...theme, isDesktop, toggleTheme }}>
      <SCThemeProvider theme={theme}>
        <Global />
        {children}
      </SCThemeProvider>
    </ThemeContext.Provider>
  );
};
