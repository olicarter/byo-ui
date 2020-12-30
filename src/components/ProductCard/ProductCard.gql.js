import { gql } from '@apollo/client';

import { ProductBrand, ProductTags, ProductVariant, User } from '@fragments';

export const GET_AUTHENTICATED_USER = gql`
  query ProductCardGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;

export const GET_PRODUCT_VARIANTS = gql`
  query ProductCardGetProductVariants($id: ID!) {
    Product(where: { id: $id }) {
      id
      ...ProductBrand
      ...ProductTags
      variants {
        ...ProductVariant
      }
    }
  }
  ${ProductBrand}
  ${ProductTags}
  ${ProductVariant}
`;
