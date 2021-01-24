import { gql } from '@apollo/client';

import { Category, Page, ProductDetails } from '@fragments';

export const GET_ALL_PAGES = gql`
  query PageGetAllPages {
    allPages {
      ...Page
    }
  }
  ${Page}
`;

export const GET_CATEGORIES_BY_SLUG = gql`
  query PageGetCategoriesBySlug($slug: String!) {
    allCategories(where: { slug: $slug }) {
      ...Category
    }
  }
  ${Category}
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query PageGetProductsBySlug($slug: String!) {
    allProducts(where: { slug: $slug }) {
      ...ProductDetails
    }
  }
  ${ProductDetails}
`;
