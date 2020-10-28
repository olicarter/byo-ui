import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_SETTINGS } from './BasketPage.gql';
import { Basket } from '../Basket';
import { BasketTotal } from '../BasketTotal';
import { Layout } from '../Layout';
import { Section } from '../Section';
import { SubTitle, Title } from '../Typography';

export const BasketPage = () => {
  const {
    data: { allSettings: [{ minOrderValue = 0 } = {}] = [] } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return (
    <Layout>
      <Section>
        <Title>Basket</Title>
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
