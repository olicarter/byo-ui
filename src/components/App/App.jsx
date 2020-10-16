import React from 'react';
import { Link, Route } from 'react-router-dom';

import { useAuth } from '../../contexts';
import * as Styled from './App.styled';
import { Basket } from '../Basket';
import { Button } from '../Button';
import { Footer } from '../Footer';
import { Home } from '../Home';
import { LogoutButton } from '../LogoutButton';
import { Product } from '../Product';
import { Products } from '../Products';
import { TopBar } from '../TopBar';
import { UserPaidOrders } from '../UserPaidOrders';

export const App = () => {
  const { isAuthenticated, openLoginModal } = useAuth();

  return (
    <Styled.App>
      <TopBar />

      <Styled.Main>
        <Route exact path="/">
          <Styled.MaxWidthLayout>
            <Styled.MaxWidth>
              <Home />
            </Styled.MaxWidth>
          </Styled.MaxWidthLayout>
        </Route>

        <Route exact path="/products">
          <Products />
        </Route>

        <Route exact path="/products/:productSlug">
          <Styled.MaxWidthLayout>
            <Styled.MaxWidth>
              <Product />
            </Styled.MaxWidth>
          </Styled.MaxWidthLayout>
        </Route>

        <Route path="/account">
          {isAuthenticated ? (
            <LogoutButton />
          ) : (
            <Button onClick={openLoginModal}>Log in</Button>
          )}
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
};
