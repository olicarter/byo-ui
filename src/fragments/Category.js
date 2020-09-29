import { gql } from '@apollo/client';

export const Category = gql`
  fragment Category on Category {
    id
    name
    slug
  }
`;
