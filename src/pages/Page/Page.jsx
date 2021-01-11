import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/client';

import { Callout } from '@components/Callout';
import { Markdown } from '@components/Markdown';
import { Layout } from '@components/Layout';
import { Section } from '@components/Section';
import { Title } from '@components/Typography';

import { GET_PAGES_BY_PATH } from './Page.gql';

export const Page = ({ children }) => {
  const { path } = useRouteMatch();

  const { data: { allPages } = {} } = useQuery(GET_PAGES_BY_PATH, {
    variables: { path },
  });

  const [{ heading, info, message, title = 'BYO' } = {}] = allPages || [];

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Layout>
        {message ? (
          <Section>
            <Callout>{message}</Callout>
          </Section>
        ) : null}

        {heading ? (
          <Section>
            <Title>{heading}</Title>
          </Section>
        ) : null}

        {info ? (
          <Section>
            <Markdown>{info}</Markdown>
          </Section>
        ) : null}

        <Section>{children}</Section>
      </Layout>
    </>
  );
};
