import React from 'react';
import { Route } from 'react-router-dom';

import { Products } from '../Products';
import { UserPaidOrders } from '../UserPaidOrders';
import { TopBar } from '../TopBar';

export const App = () => (
  <>
    <TopBar />
    <Route path="/products/:tagSlug">
      <Products />
    </Route>
    <Route path="/account">
      <UserPaidOrders />
    </Route>
  </>
);
