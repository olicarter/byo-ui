import React from 'react';
import { useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/client';
import { parse } from 'qs';
import Mustache from 'mustache';
import { capitalCase } from 'change-case';

import { Callout } from '@components/Callout';
import { Markdown } from '@components/Markdown';
import { Layout } from '@components/Layout';
import { Section } from '@components/Section';
import { Title } from '@components/Typography';

import { GET_ALL_PAGES } from './Page.gql';

export const Page = ({ children }) => {
  const { search } = useLocation();
  const { postSlug, productSlug } = useParams();
  const { path } = useRouteMatch();

  const { category: categorySlug } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const { data: { allPages } = {} } = useQuery(GET_ALL_PAGES);

  const { heading, info, message, title = 'BYO' } =
    (allPages || []).find(page => page.path === path) || {};

  const computedHeading =
    heading ||
    (categorySlug || '').replaceAll('-', ' ') ||
    (postSlug || '').replaceAll('-', ' ') ||
    (productSlug || '').replaceAll('-', ' ') ||
    '';

  const computedTitle = Mustache.render(title, {
    postSlug: capitalCase(postSlug || ''),
    productSlug: capitalCase(productSlug || ''),
  });

  return (
    <>
      <Helmet>
        <title>{computedTitle}</title>
      </Helmet>

      <Layout>
        {message ? (
          <Section>
            <Callout>{message}</Callout>
          </Section>
        ) : null}

        {computedHeading ? (
          <Section>
            <Title>{computedHeading}</Title>
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
