import React from 'react';
import { useQuery } from '@apollo/client';

import { BlogPosts } from '@components/BlogPosts';
import { Layout } from '@components/Layout';
import { Markdown } from '@components/Markdown';
import { Section } from '@components/Section';

import { GET_ALL_SETTINGS } from './BlogPage.gql';

export const BlogPage = () => {
  const {
    data: { allSettings: [{ blogHeader = '' } = {}] = [] } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return (
    <Layout>
      <Section>
        <Markdown>{blogHeader}</Markdown>
      </Section>
      <Section>
        <BlogPosts />
      </Section>
    </Layout>
  );
};
