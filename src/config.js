import React from 'react';

import {
  AboutPage,
  AccountPage,
  BasketPage,
  CheckoutPage,
  ContactPage,
  HomePage,
  LoginPage,
  ProductPage,
  ProductsPage,
  RegisterPage,
  ResetPasswordPage,
} from '@pages';

export const config = {
  pages: {
    home: {
      path: '/',
      exact: true,
      component: <HomePage />,
    },
    about: {
      path: '/about',
      exact: true,
      component: <AboutPage />,
    },
    contact: {
      path: '/contact',
      exact: true,
      component: <ContactPage />,
    },
    products: {
      path: '/products',
      exact: true,
      component: <ProductsPage />,
    },
    product: {
      path: '/products/:productSlug',
      exact: true,
      component: <ProductPage />,
    },
    login: {
      path: '/login',
      exact: true,
      component: <LoginPage />,
    },
    resetPassword: {
      path: '/reset-password',
      exact: true,
      component: <ResetPasswordPage />,
    },
    register: {
      path: '/register',
      exact: true,
      component: <RegisterPage />,
    },
    account: {
      path: '/account',
      component: <AccountPage />,
      private: true,
    },
    basket: {
      path: '/basket',
      component: <BasketPage />,
      private: true,
    },
    checkout: {
      path: '/checkout',
      component: <CheckoutPage />,
      private: true,
    },
  },
};
