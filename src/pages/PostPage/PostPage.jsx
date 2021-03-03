import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Markdown } from '@components/Markdown';

import { GET_BLOG_POST_BY_SLUG } from './PostPage.gql';

export const PostPage = () => {
  const { postSlug } = useParams();

  const { data: { allBlogPosts: [blogPost] = [] } = {} } = useQuery(
    GET_BLOG_POST_BY_SLUG,
    {
      variables: { slug: postSlug },
    },
  );

  if (!blogPost) return null;

  const { content } = blogPost || {};

  return <Markdown>{content}</Markdown>;
};
