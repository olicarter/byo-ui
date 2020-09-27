import React from 'react';
import { Link, Route } from 'react-router-dom';

import * as Styled from './App.styled';
import { Basket } from '../Basket';
import { Footer } from '../Footer';
import { PageHeader } from '../PageHeader';
import { Products } from '../Products';
import { SubTitle, Title } from '../Typography';
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

      <Route path="/blog">
        {/* <PageHeader>
          <Title>Blog</Title>
          <SubTitle>Don't think this is part of original spec</SubTitle>
        </PageHeader> */}
        {/* <Products /> */}
      </Route>
    </Styled.Main>

    <Footer />
  </Styled.App>
);
