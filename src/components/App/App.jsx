import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { NetworkStatus, useQuery } from '@apollo/client';

import { useAuth } from '../../contexts';
import { GET_AUTHENTICATED_USER, GET_PRODUCTS, GET_SETTINGS } from './App.gql';
import * as Styled from './App.styled';
import { About } from '../About';
import { AccountPage } from '../AccountPage';
import { BasketPage } from '../BasketPage';
import { CategoryBar } from '../CategoryBar';
import { CheckoutPage } from '../CheckoutPage';
import { Footer } from '../Footer';
import { Home } from '../Home';
import { Layout } from '../Layout';
import { LoadingPage } from '../LoadingPage';
import { LoginPage } from '../LoginPage';
import { Markdown } from '../Markdown';
import { Product } from '../Product';
import { Products } from '../Products';
import { ProtectedRoute } from '../ProtectedRoute';
import { RegisterPage } from '../RegisterPage';
import { Section } from '../Section';
import { TagBar } from '../TagBar';
import { TopBar } from '../TopBar';

export const App = () => {
  const { isAuthenticated } = useAuth();

  const {
    data,
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

      <Styled.Main>
        <Route exact path="/">
          <Layout>
            <Section>
              <Home />
            </Section>
          </Layout>
        </Route>

        <Route exact path="/about">
          <Layout>
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
              <CategoryBar />
              <TagBar />
            </Section>
            <Section>
              <Products />
            </Section>
          </Layout>
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
