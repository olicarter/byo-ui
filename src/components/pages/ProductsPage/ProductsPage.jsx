import React from 'react';
import { useQuery } from '@apollo/client';

import { CategoryBar } from '@components/CategoryBar';
import { Layout } from '@components/Layout';
import { Markdown } from '@components/Markdown';
import { Products } from '@components/Products';
import { Section } from '@components/Section';
import { TagBar } from '@components/TagBar';

import { GET_ALL_SETTINGS } from './ProductsPage.gql';

export const ProductsPage = () => {
  const {
    data: { allSettings: [{ shopHeader = '' } = {}] = [] } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return (
    <Layout>
      <Section>
        <Markdown>{shopHeader}</Markdown>
      </Section>
      <Section margin="0" padding="0">
        <CategoryBar />
        <TagBar />
      </Section>
      <Section>
        <Products />
      </Section>
    </Layout>
  );
};
