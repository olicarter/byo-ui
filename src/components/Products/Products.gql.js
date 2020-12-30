import { gql } from '@apollo/client';

import { ProductDetails } from '@fragments';

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
    }
  }
  ${ProductDetails}
`;
