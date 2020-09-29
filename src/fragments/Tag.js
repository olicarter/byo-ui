import { gql } from '@apollo/client';

export const Tag = gql`
  fragment Tag on Tag {
    id
    name
    slug
  }
`;
