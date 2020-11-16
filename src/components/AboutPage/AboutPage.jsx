import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_SETTINGS } from './AboutPage.gql';
import { Layout } from '../Layout';
import { Markdown } from '../Markdown';
import { Section } from '../Section';

export const AboutPage = () => {
  const {
    data: {
      allSettings: [{ aboutContent = '', aboutHeader = '' } = {}] = [],
    } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return (
    <Layout>
      <Section>
        <Markdown>{aboutHeader}</Markdown>
      </Section>
      <Section>
        <Markdown>{aboutContent}</Markdown>
      </Section>
    </Layout>
  );
};
