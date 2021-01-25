import React, { useEffect } from 'react';
import { useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useLazyQuery, useQuery } from '@apollo/client';
import { parse } from 'qs';

import { Callout } from '@components/Callout';
import { Markdown } from '@components/Markdown';
import { Layout } from '@components/Layout';
import { Section } from '@components/Section';
import { Title } from '@components/Typography';

import {
  GET_ALL_PAGES,
  GET_CATEGORIES_BY_SLUG,
  GET_PRODUCT_BY_SLUG,
} from './Page.gql';

export const Page = ({ children }) => {
  const { search } = useLocation();
  const { productSlug } = useParams();
  const { path } = useRouteMatch();

  const { category: categorySlug } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const { data: { allPages } = {} } = useQuery(GET_ALL_PAGES);

  const [getCategoryBySlug, { data: { allCategories } = {} }] = useLazyQuery(
    GET_CATEGORIES_BY_SLUG,
    {
      fetchPolicy: 'cache-and-network',
      variables: { slug: categorySlug },
    },
  );

  useEffect(() => {
    if (categorySlug) getCategoryBySlug();
  }, [getCategoryBySlug, categorySlug]);

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

  const [{ name: category } = {}] = allCategories || [];

  const [{ name } = {}] = allProducts || [];

  const { heading, info, message, title = 'BYO' } =
    (allPages || []).find(page => page.path === path) || {};

  const computedHeading =
    heading ||
    category ||
    (categorySlug || '').replaceAll('-', ' ') ||
    name ||
    (productSlug || '').replaceAll('-', ' ') ||
    '-';

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

        <Section>
          <Title>{computedHeading}</Title>
        </Section>

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
