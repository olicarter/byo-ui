import { gql } from '@apollo/client';

import { Page, ProductDetails } from '@fragments';

export const GET_PAGES_BY_PATH = gql`
  query PageGetPagesByPath($path: String!) {
    allPages(where: { path: $path }) {
      ...Page
    }
  }
  ${Page}
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query PageGetProductsBySlug($slug: String!) {
    allProducts(where: { slug: $slug }) {
      ...ProductDetails
    }
  }
  ${ProductDetails}
`;
