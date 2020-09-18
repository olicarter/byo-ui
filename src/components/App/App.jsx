import React from 'react';
import { Link, Route } from 'react-router-dom';

import { Basket } from '../Basket';
import { Footer } from '../Footer';
import { PageHeader } from '../PageHeader';
import { Products } from '../Products';
import { SubTitle, Title } from '../Typography';
import { TopBar } from '../TopBar';
import { UserPaidOrders } from '../UserPaidOrders';
import { TextInput } from '../TextInput';

export const App = () => (
  <>
    <TopBar />
    <Route path="/products/:tagSlug">
      <PageHeader>
        <Title>Shop</Title>
        <SubTitle>Some deep quote</SubTitle>
      </PageHeader>
      <Products />
    </Route>

    <Route path="/account">
      <UserPaidOrders />
      <TextInput />
    </Route>

    <Route path="/basket">
      <Basket />
      <Link to="/checkout">Go to Checkout</Link>
    </Route>

    <Route path="/blog">
      <PageHeader>
        <Title>Blog</Title>
        <SubTitle>Don't think this is part of original spec</SubTitle>
      </PageHeader>
      <Products />
    </Route>

    <Footer />
  </>
);
