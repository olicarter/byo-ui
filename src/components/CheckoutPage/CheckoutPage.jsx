import React from 'react';

import { Checkout } from '../Checkout';
import { Layout } from '../Layout';
import { Markdown } from '../Markdown';
import { Section } from '../Section';

export const CheckoutPage = () => (
  <Layout>
    <Section>
      <Markdown># Checkout</Markdown>
    </Section>
    <Section>
      <Checkout />
    </Section>
  </Layout>
);
