import React from 'react';
import { Link, Route } from 'react-router-dom';

import * as Styled from './App.styled';
import { Basket } from '../Basket';
import { Footer } from '../Footer';
import { Products } from '../Products';
import { TopBar } from '../TopBar';
import { UserPaidOrders } from '../UserPaidOrders';

export const App = () => (
  <Styled.App>
    <TopBar />

    <Styled.Main>
      <Route path="/products">
        <Products />
      </Route>

      <Route path="/account">
        <UserPaidOrders />
      </Route>

      <Route path="/basket">
        <Basket />
        <Link to="/checkout">Go to Checkout</Link>
      </Route>
    </Styled.Main>

    <Footer />
  </Styled.App>
);
