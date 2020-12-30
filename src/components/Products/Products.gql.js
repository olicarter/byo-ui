import { gql } from '@apollo/client';

import { ProductBrand, ProductDetails, ProductTags } from '@fragments';

export const GET_PRODUCTS = gql`
  query ProductsGetProducts(
    $limit: Int
    $offset: Int
    $search: String
    $where: ProductWhereInput
  ) {
    allProducts(
      first: $limit
      search: $search
      skip: $offset
      sortBy: name_ASC
      where: $where
    ) {
      ...ProductDetails
      ...ProductBrand
      ...ProductTags
    }
  }
  ${ProductDetails}
  ${ProductBrand}
  ${ProductTags}
`;
