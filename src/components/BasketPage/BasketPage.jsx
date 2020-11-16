import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_SETTINGS } from './BasketPage.gql';
import { Basket } from '../Basket';
import { BasketTotal } from '../BasketTotal';
import { Layout } from '../Layout';
import { Markdown } from '../Markdown';
import { Section } from '../Section';
import { SubTitle } from '../Typography';

export const BasketPage = () => {
  const {
    data: {
      allSettings: [{ basketHeader = '', minOrderValue = 0 } = {}] = [],
    } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return (
    <Layout>
      <Section>
        <Markdown>{basketHeader}</Markdown>
        <SubTitle color={BasketTotal() < minOrderValue ? 'red' : undefined}>
          <BasketTotal showCurrencySymbol /> / £
          {Number(minOrderValue).toFixed(2)} min
        </SubTitle>
      </Section>
      <Section>
        <Basket />
      </Section>
    </Layout>
  );
};
