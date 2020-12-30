import React from 'react';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';

import { Layout } from '@components/Layout';
import { Markdown } from '@components/Markdown';
import { Section } from '@components/Section';
import { ContactForm } from '@forms';

import { GET_ALL_SETTINGS } from './ContactPage.gql';

export const ContactPage = () => {
  const {
    data: { allSettings: [{ contactHeader = '' } = {}] = [] } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return (
    <>
      <Helmet>
        <title>BYO | Contact</title>
      </Helmet>
      <Layout>
        <Section>
          <Markdown>{contactHeader}</Markdown>
        </Section>
        <Section>
          <ContactForm />
        </Section>
      </Layout>
    </>
  );
};
