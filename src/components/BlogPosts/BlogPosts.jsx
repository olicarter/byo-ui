import React from 'react';
import { useQuery } from '@apollo/client';

import { Markdown } from '@components/Markdown';
import { SubTitle } from '@components/Typography';

import { GET_ALL_PUBLISHED_BLOG_POSTS } from './BlogPosts.gql';
import * as Styled from './BlogPosts.styled';

export const BlogPosts = () => {
  const { data: { allBlogPosts } = {} } = useQuery(
    GET_ALL_PUBLISHED_BLOG_POSTS,
  );

  return (
    <Styled.BlogPosts>
      {(allBlogPosts || []).map(({ id, content, title }) => (
        <Styled.BlogPost key={id}>
          <SubTitle>{title}</SubTitle>
          <Markdown>{content}</Markdown>
        </Styled.BlogPost>
      ))}
    </Styled.BlogPosts>
  );
};
