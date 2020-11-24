import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_SETTINGS } from './BlogPage.gql';
import { BlogPosts } from '../BlogPosts';
import { Layout } from '../Layout';
import { Markdown } from '../Markdown';
import { Section } from '../Section';

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
