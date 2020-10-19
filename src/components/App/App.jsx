import React from 'react';
import { Route } from 'react-router-dom';

import { useAuth } from '../../contexts';
import * as Styled from './App.styled';
import { Basket } from '../Basket';
import { Button } from '../Button';
import { Footer } from '../Footer';
import { Home } from '../Home';
import { Layout } from '../Layout';
import { LogoutButton } from '../LogoutButton';
import { Product } from '../Product';
import { Products } from '../Products';
import { Section } from '../Section';
import { SubmittedUnpaidOrder } from '../SubmittedUnpaidOrder';
import { TopBar } from '../TopBar';
import { UserSubmittedOrders } from '../UserSubmittedOrders';
import { Title } from '../Typography';

export const App = () => {
  const { isAuthenticated, openLoginModal } = useAuth();

  return (
    <Styled.App>
      <TopBar />

      <Styled.Main>
        <Route exact path="/">
          <Layout center>
            <Home />
          </Layout>
        </Route>

        <Route path="/account">
          <Layout center>
            {isAuthenticated ? (
              <>
                <SubmittedUnpaidOrder />
                <Section>
                  <UserSubmittedOrders />
                </Section>
                <Section>
                  <LogoutButton />
                </Section>
              </>
            ) : (
              <Button borderRadius onClick={openLoginModal}>
                Log in
              </Button>
            )}
          </Layout>
        </Route>

        <Route exact path="/products">
          <Layout>
            <Products />
          </Layout>
        </Route>

        <Route exact path="/products/:productSlug">
          <Layout center>
            <Product />
          </Layout>
        </Route>

        <Route path="/basket">
          <Layout>
            <Section>
              <Title>Checkout</Title>
            </Section>
            <Section>
              <Basket />
            </Section>
          </Layout>
        </Route>
      </Styled.Main>

      <Footer />
    </Styled.App>
  );
};
