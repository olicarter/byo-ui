import { gql } from '@apollo/client';

import { BlogPost } from '@fragments';

export const GET_BLOG_POST_BY_SLUG = gql`
  query PostPageGetBlogPostBySlug($slug: String!) {
    allBlogPosts(where: { slug: $slug }) {
      ...BlogPost
    }
  }
  ${BlogPost}
`;
