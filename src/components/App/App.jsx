import React from 'react';
import { Route } from 'react-router-dom';

import { useAuth } from '../../contexts';
import * as Styled from './App.styled';
import { About } from '../About';
import { Basket } from '../Basket';
import { Button } from '../Button';
import { CategoryBar } from '../CategoryBar';
import { Checkout } from '../Checkout';
import { FloatingButton } from '../FloatingButton';
import { Footer } from '../Footer';
import { Home } from '../Home';
import { Layout } from '../Layout';
import { Markdown } from '../Markdown';
import { Product } from '../Product';
import { Products } from '../Products';
import { Section } from '../Section';
import { TagBar } from '../TagBar';
import { TopBar } from '../TopBar';
import { UserOrders } from '../UserOrders';

export const App = () => {
  const { isAuthenticated, logout, openLoginModal } = useAuth();

  return (
    <Styled.App>
      <TopBar />

      <Styled.Main>
        <Route exact path="/">
          <Layout center>
            <Section>
              <Home />
            </Section>
          </Layout>
        </Route>

        <Route exact path="/about">
          <Layout center>
            <Section>
              <About />
            </Section>
          </Layout>
        </Route>

        <Route path="/account">
          <Layout center>
            {isAuthenticated ? (
              <>
                {/* <SubmittedUnpaidOrder /> */}
                <Section>
                  <UserOrders />
                </Section>
                <Section>
                  <FloatingButton backgroundColor="red" onClick={logout}>
                    Log out
                  </FloatingButton>
                </Section>
              </>
            ) : (
              <FloatingButton onClick={openLoginModal}>Log in</FloatingButton>
            )}
          </Layout>
        </Route>

        <Route exact path="/products">
          <Layout>
            <Section>
              <Markdown># Products</Markdown>
            </Section>
            <Section padding="0">
              <CategoryBar />
              <TagBar />
            </Section>
            <Section>
              <Products />
            </Section>
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
              <Markdown># Basket</Markdown>
            </Section>
            <Section>
              <Basket />
            </Section>
          </Layout>
        </Route>

        <Route path="/checkout">
          <Layout>
            <Section>
              <Markdown># Checkout</Markdown>
            </Section>
            <Section>
              <Checkout />
            </Section>
          </Layout>
        </Route>
      </Styled.Main>

      <Footer />
    </Styled.App>
  );
};
