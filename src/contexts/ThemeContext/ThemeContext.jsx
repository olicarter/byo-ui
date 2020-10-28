import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createGlobalStyle,
  ThemeProvider as SCThemeProvider,
} from 'styled-components';
import { useMediaLayout } from 'use-media';

const themes = {
  dark: {
    name: 'dark',
    palette: {
      black: 'hsl(40, 100%, 97%)',
      cream: '#ddd5c4',
      teal: '#1d7771',
      green: 'hsl(140, 66%, 44%)',
      grey: '#999',
      lightGrey: 'hsl(0, 0%, 95%)',
      red: 'hsl(350, 75%, 50%)',
      pink: '#f0bac7',
      primary: 'hsl(43, 98%, 55%)',
      yellow: '#f9e543',
      white: '#111',
    },
  },
  light: {
    name: 'light',
    palette: {
      black: 'black',
      cream: '#ddd5c4',
      teal: '#1d7771',
      green: 'hsl(140, 66%, 47%)',
      grey: '#999',
      lightGrey: 'hsl(0, 0%, 95%)',
      red: 'hsl(350, 85%, 66%)',
      pink: '#f0bac7',
      primary: 'hsl(43, 98%, 60%)',
      yellow: '#f9e543',
      white: 'white',
    },
  },
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
  const isDesktop = useMediaLayout({ minWidth: '600px' });

  const [theme, setTheme] = useState(
    themes[localStorage.getItem('byo.themeName') || 'light'],
  );

  useEffect(() => {
    localStorage.setItem('byo.themeName', theme.name);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme.name === 'dark' ? themes.light : themes.dark);
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
