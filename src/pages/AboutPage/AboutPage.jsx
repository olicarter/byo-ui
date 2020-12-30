import React from 'react';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';

import { Layout } from '@components/Layout';
import { Markdown } from '@components/Markdown';
import { Section } from '@components/Section';

import { GET_ALL_SETTINGS } from './AboutPage.gql';

export const AboutPage = () => {
  const {
    data: {
      allSettings: [{ aboutContent = '', aboutHeader = '' } = {}] = [],
    } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return (
    <>
      <Helmet>
        <title>BYO | About</title>
      </Helmet>
      <Layout>
        <Section>
          <Markdown>{aboutHeader}</Markdown>
        </Section>
        <Section>
          <Markdown>{aboutContent}</Markdown>
        </Section>
      </Layout>
    </>
  );
};
