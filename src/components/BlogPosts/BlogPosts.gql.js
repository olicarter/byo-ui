import { gql } from '@apollo/client';

import { BlogPost } from '@fragments';

export const GET_ALL_PUBLISHED_BLOG_POSTS = gql`
  query {
    allBlogPosts(sortBy: createdAt_DESC, where: { status: published }) {
      ...BlogPost
    }
  }
  ${BlogPost}
`;
