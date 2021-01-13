import React, { useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useLazyQuery, useQuery } from '@apollo/client';

import { Callout } from '@components/Callout';
import { Markdown } from '@components/Markdown';
import { Layout } from '@components/Layout';
import { Section } from '@components/Section';
import { Title } from '@components/Typography';

import { GET_PAGES_BY_PATH, GET_PRODUCT_BY_SLUG } from './Page.gql';

export const Page = ({ children }) => {
  const { productSlug } = useParams();
  const { path } = useRouteMatch();

  const { data: { allPages } = {} } = useQuery(GET_PAGES_BY_PATH, {
    variables: { path },
  });

  const [getProductBySlug, { data: { allProducts } = {} }] = useLazyQuery(
    GET_PRODUCT_BY_SLUG,
    {
      fetchPolicy: 'cache-and-network',
      variables: { slug: productSlug },
    },
  );

  useEffect(() => {
    if (productSlug) getProductBySlug();
  }, [getProductBySlug, productSlug]);

  const [{ name } = {}] = allProducts || [];

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

        {name || heading ? (
          <Section>
            <Title>{name || heading}</Title>
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
