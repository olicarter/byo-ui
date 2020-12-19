import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { NetworkStatus, useQuery } from '@apollo/client';

import { useAuth } from '@contexts';
import {
  AboutPage,
  AccountPage,
  BasketPage,
  BlogPage,
  CheckoutPage,
  LoadingPage,
  LoginPage,
  ProductsPage,
  RegisterPage,
} from '@pages';
import { Callout } from '@components/Callout';
import { Footer } from '@components/Footer';
import { Home } from '@components/Home';
import { Layout } from '@components/Layout';
import { Product } from '@components/Product';
import { ProtectedRoute } from '@components/ProtectedRoute';
import { Section } from '@components/Section';
import { TopBar } from '@components/TopBar';

import { GET_AUTHENTICATED_USER, GET_PRODUCTS, GET_SETTINGS } from './App.gql';
import * as Styled from './App.styled';

export const App = () => {
  const { isAuthenticated } = useAuth();

  const {
    loading: getAuthenticatedUserLoading,
    networkStatus: getAuthenticatedUserNetworkStatus,
    refetch: getAuthenticatedUserRefetch,
  } = useQuery(GET_AUTHENTICATED_USER, { notifyOnNetworkStatusChange: true });

  const {
    loading: getProductsLoading,
    networkStatus: getProductsNetworkStatus,
    refetch: getProductsRefetch,
  } = useQuery(GET_PRODUCTS);

  const {
    data: { allSettings: [{ calloutText } = {}] = [] } = {},
    loading: getSettingsLoading,
    networkStatus: getSettingsNetworkStatus,
    refetch: getSettingsRefetch,
  } = useQuery(GET_SETTINGS);

  useEffect(() => {
    getAuthenticatedUserRefetch();
    getProductsRefetch();
    getSettingsRefetch();
  }, [isAuthenticated]);

  if (
    getAuthenticatedUserLoading ||
    getProductsLoading ||
    getSettingsLoading ||
    getAuthenticatedUserNetworkStatus === NetworkStatus.refetch ||
    getProductsNetworkStatus === NetworkStatus.refetch ||
    getSettingsNetworkStatus === NetworkStatus.refetch
  )
    return <LoadingPage />;

  return (
    <Styled.App>
      <TopBar />

      {!!calloutText ? (
        <Section>
          <Callout />
        </Section>
      ) : null}

      <Styled.Main>
        <Route exact path="/">
          <Layout>
            <Section>
              <Home />
            </Section>
          </Layout>
        </Route>

        <Route exact path="/about">
          <AboutPage />
        </Route>

        <Route exact path="/blog">
          <BlogPage />
        </Route>

        <Route exact path="/products">
          <ProductsPage />
        </Route>

        <Route exact path="/products/:productSlug">
          <Layout>
            <Product />
          </Layout>
        </Route>

        <Route exact path="/login">
          <LoginPage />
        </Route>

        <Route exact path="/register">
          <RegisterPage />
        </Route>

        <ProtectedRoute path="/account">
          <AccountPage />
        </ProtectedRoute>

        <ProtectedRoute path="/basket">
          <BasketPage />
        </ProtectedRoute>

        <ProtectedRoute path="/checkout">
          <CheckoutPage />
        </ProtectedRoute>
      </Styled.Main>

      <Footer />
    </Styled.App>
  );
};
