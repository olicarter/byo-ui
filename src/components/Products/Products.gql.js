import { gql } from '@apollo/client';

import {
  ProductBrand,
  ProductDetails,
  ProductTags,
  ProductVariants,
} from '@fragments';

export const GET_PRODUCTS = gql`
  query ProductsGetProducts($search: String, $where: ProductWhereInput) {
    allProducts(search: $search, sortBy: name_ASC, where: $where) {
      ...ProductDetails
      ...ProductBrand
      ...ProductTags
      ...ProductVariants
    }
  }
  ${ProductDetails}
  ${ProductBrand}
  ${ProductTags}
  ${ProductVariants}
`;

export const GET_PRODUCTS_COUNT = gql`
  query ProductsGetProductsCount($search: String, $where: ProductWhereInput) {
    _allProductsMeta(search: $search, where: $where) {
      count
    }
  }
`;
