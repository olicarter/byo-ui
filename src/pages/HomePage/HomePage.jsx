import React from 'react';

import { Home } from '@components/Home';
import { Layout } from '@components/Layout';
import { Section } from '@components/Section';

export const HomePage = () => (
  <Layout>
    <Section>
      <Home />
    </Section>
  </Layout>
);
