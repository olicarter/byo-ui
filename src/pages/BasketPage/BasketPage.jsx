import React from 'react';
import { useQuery } from '@apollo/client';

import { Basket } from '@components/Basket';
import { BasketTotal } from '@components/BasketTotal';
import { Section } from '@components/Section';
import { SubTitle } from '@components/Typography';

import { GET_ALL_SETTINGS } from './BasketPage.gql';

export const BasketPage = () => {
  const {
    data: { allSettings: [{ minOrderValue = 0 } = {}] = [] } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return (
    <>
      <Section>
        <SubTitle color={BasketTotal() < minOrderValue ? 'red' : undefined}>
          <BasketTotal showCurrencySymbol /> / £
          {Number(minOrderValue).toFixed(2)} min
        </SubTitle>
      </Section>

      <Section>
        <Basket />
      </Section>
    </>
  );
};
