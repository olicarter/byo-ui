import { gql } from '@apollo/client';

export const BlogPost = gql`
  fragment BlogPost on BlogPost {
    id
    title
    content
    status
  }
`;
