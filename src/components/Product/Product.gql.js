import { gql } from '@apollo/client';

import { ProductDetails, ProductTags } from '@fragments';

export const GET_PRODUCTS_BY_SLUG = gql`
  query ProductGetProductsBySlug($slug: String!) {
    allProducts(where: { slug: $slug }) {
      ...ProductDetails
      ...ProductTags
    }
  }
  ${ProductDetails}
  ${ProductTags}
`;
