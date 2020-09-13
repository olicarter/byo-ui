import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Basket } from '../Basket';
import { Products } from '../Products';
import { TopBar } from '../TopBar';

export const App = () => (
  <>
    <TopBar />
    <Route path="/products/:tagSlug">
      <Products />
    </Route>
    <Route path="/basket">
      <Basket />
      <Link to="/checkout">Go to Checkout</Link>
    </Route>
  </>
);
