import React from 'react';
import { useQuery } from '@apollo/client';
import { format, parseISO } from 'date-fns';

import { Link } from '@components/Link';
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
      {(allBlogPosts || []).map(({ id, content, createdAt, slug, title }) => (
        <Styled.BlogPost key={id}>
          <Link to={`/blog/${slug}`}>
            <SubTitle>{title}</SubTitle>
          </Link>
          <h4>{format(parseISO(createdAt), 'MM/dd/yyyy')}</h4>
          <Markdown lines={3}>{content}</Markdown>
        </Styled.BlogPost>
      ))}
    </Styled.BlogPosts>
  );
};
