import React, { createContext, useContext } from 'react';
import {
  createGlobalStyle,
  ThemeProvider as SCThemeProvider,
} from 'styled-components';

const theme = {
  palette: {
    black: 'black',
    cream: '#ddd5c4',
    teal: '#1d7771',
    green: '#60b677',
    grey: 'hsl(0, 0%, 66%)',
    lightGrey: 'hsl(0, 0%, 95%)',
    red: '#e97f71',
    pink: '#f0bac7',
    primary: '#1d7771',
    yellow: '#f9e543',
    white: 'white',
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
    webkitFontSmoothing: 'antialiased',
  },
}));

export const ThemeContext = createContext({});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={theme}>
    <SCThemeProvider theme={theme}>
      <Global />
      {children}
    </SCThemeProvider>
  </ThemeContext.Provider>
);
