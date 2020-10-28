import React from 'react';
import { Route } from 'react-router-dom';

import * as Styled from './App.styled';
import { About } from '../About';
import { AccountPage } from '../AccountPage';
import { BasketPage } from '../BasketPage';
import { CategoryBar } from '../CategoryBar';
import { CheckoutPage } from '../CheckoutPage';
import { Footer } from '../Footer';
import { Home } from '../Home';
import { Layout } from '../Layout';
import { Markdown } from '../Markdown';
import { Product } from '../Product';
import { Products } from '../Products';
import { ProtectedRoute } from '../ProtectedRoute';
import { Section } from '../Section';
import { TagBar } from '../TagBar';
import { TopBar } from '../TopBar';
import { ProductSearch } from '../ProductSearch';

export const App = () => (
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

      <Route exact path="/products">
        <Layout>
          <Section>
            <Markdown># Products</Markdown>
          </Section>
          <Section margin="0" padding="0">
            <ProductSearch />
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

      <ProtectedRoute path="/account" component={AccountPage} />

      <ProtectedRoute path="/basket" component={BasketPage} />

      <ProtectedRoute path="/checkout" component={CheckoutPage} />
    </Styled.Main>

    <Footer />
  </Styled.App>
);
