import React from 'react';
import { Route } from 'react-router-dom';

import { Products } from '../Products';
import { TopBar } from '../TopBar';

export const App = () => (
  <>
    <TopBar />
    <Route path="/products/:tagSlug">
      <Products />
    </Route>
  </>
);
