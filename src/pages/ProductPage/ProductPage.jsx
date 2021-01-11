import React from 'react';
// import { useRouteMatch } from 'react-router-dom';

import { Layout } from '@components/Layout';
import { Product } from '@components/Product';

export const ProductPage = () => {
  return (
    <Layout>
      <Product />
    </Layout>
  );
};
