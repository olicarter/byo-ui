import React from 'react';
import { useQuery } from '@apollo/client';

import { Checkout } from '@components/Checkout';
import { Layout } from '@components/Layout';
import { Markdown } from '@components/Markdown';
import { Section } from '@components/Section';

import { GET_ALL_SETTINGS } from './CheckoutPage.gql';

export const CheckoutPage = () => {
  const {
    data: { allSettings: [{ checkoutHeader = '' } = {}] = [] } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return (
    <Layout>
      <Section>
        <Markdown>{checkoutHeader}</Markdown>
      </Section>
      <Section>
        <Checkout />
      </Section>
    </Layout>
  );
};
