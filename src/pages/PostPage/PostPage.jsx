import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { FloatingButton } from '@components/FloatingButton';
import { Markdown } from '@components/Markdown';

import { GET_BLOG_POST_BY_SLUG } from './PostPage.gql';

export const PostPage = () => {
  const { goBack } = useHistory();
  const { postSlug } = useParams();

  const { data: { allBlogPosts } = {} } = useQuery(GET_BLOG_POST_BY_SLUG, {
    variables: { slug: postSlug },
  });

  const [blogPost] = allBlogPosts || [];
  const { content } = blogPost || {};

  return (
    <>
      <Markdown>{content}</Markdown>
      <FloatingButton onClick={goBack}>Go back</FloatingButton>
    </>
  );
};
