import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { AuthProvider, GQLProvider, ThemeProvider } from '../../contexts';
import { Products } from '../Products';
import { TagBar } from '../TagBar';
import { TopBar } from '../TopBar';

export const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <GQLProvider>
        <ThemeProvider>
          <TopBar />
          <Route path="/products/:tagSlug">
            <TagBar />
            <Products />
          </Route>
        </ThemeProvider>
      </GQLProvider>
    </AuthProvider>
  </BrowserRouter>
);
