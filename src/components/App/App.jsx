import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { AuthProvider } from '../../contexts';
import { Products } from '../Products';
import { TagBar } from '../TagBar';
import { TopBar } from '../TopBar';

const { REACT_APP_GRAPHCMS_TOKEN, REACT_APP_GRAPHCMS_URL } = process.env;

const theme = {
  palette: {
    black: 'black',
    cream: '#ddd5c4',
    teal: '#1d7771',
    green: '#60b677',
    grey: 'hsl(0, 0%, 66%)',
    orange: '#e97f71',
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

const client = new ApolloClient({
  uri: REACT_APP_GRAPHCMS_URL,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${REACT_APP_GRAPHCMS_TOKEN}`,
  },
});

export const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Global />
        <ApolloProvider client={client}>
          <TopBar />
          <Route path="/products/:tagSlug">
            <TagBar />
            <Products />
          </Route>
        </ApolloProvider>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);
