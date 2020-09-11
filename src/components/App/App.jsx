import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { AuthProvider, GQLProvider, ThemeProvider } from '../../contexts';
import { Products } from '../Products';
import { TopBar } from '../TopBar';

export const App = () => (
  <BrowserRouter>
    <GQLProvider>
      <AuthProvider>
        <ThemeProvider>
          <TopBar />
          <Route path="/products/:tagSlug">
            <Products />
          </Route>
        </ThemeProvider>
      </AuthProvider>
    </GQLProvider>
  </BrowserRouter>
);
