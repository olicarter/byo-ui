import React from 'react';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';

import { CategoryBar } from '@components/CategoryBar';
import { Layout } from '@components/Layout';
import { Markdown } from '@components/Markdown';
import { Products } from '@components/Products';
import { Section } from '@components/Section';
import { SearchBar } from '@components/SearchBar';
import { TagBar } from '@components/TagBar';

import { GET_ALL_SETTINGS } from './ProductsPage.gql';

export const ProductsPage = () => {
  const {
    data: { allSettings: [{ shopHeader = '' } = {}] = [] } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return (
    <>
      <Helmet>
        <title>BYO | Shop</title>
      </Helmet>
      <Layout>
        <Section>
          <Markdown>{shopHeader}</Markdown>
        </Section>
        <Section margin="0" padding="0">
          <CategoryBar />
          <TagBar />
          <SearchBar />
        </Section>
        <Section>
          <Products />
        </Section>
      </Layout>
    </>
  );
};
