import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_SETTINGS } from './ProductsPage.gql';
import { CategoryBar } from '../CategoryBar';
import { Layout } from '../Layout';
import { Markdown } from '../Markdown';
import { Products } from '../Products';
import { Section } from '../Section';
import { TagBar } from '../TagBar';

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
