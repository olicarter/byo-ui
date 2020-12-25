import { gql } from '@apollo/client';

export const Brand = gql`
  fragment Brand on Brand {
    id
    name
    slug
  }
`;
