import { gql } from '@apollo/client';

export const GET_ALL_PRODUCTS_QUERY = gql`
  query {
    allProducts {
      id
    }
  }
`;

export const GET_TAG_PRODUCTS_QUERY = gql`
  query($tagSlug: String!) {
    allProducts(where: { tags_some: { slug: $tagSlug } }) {
      id
    }
  }
`;
