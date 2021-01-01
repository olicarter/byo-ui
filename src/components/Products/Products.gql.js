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

export const GET_PRODUCTS_DETAILS = gql`
  query ProductsGetProductsDetails($search: String, $where: ProductWhereInput) {
    allProducts(search: $search, sortBy: name_ASC, where: $where) {
      ...ProductDetails
    }
  }
  ${ProductDetails}
`;

export const GET_PRODUCTS_BRAND = gql`
  query ProductsGetProductsBrand($search: String, $where: ProductWhereInput) {
    allProducts(search: $search, sortBy: name_ASC, where: $where) {
      id
      ...ProductBrand
    }
  }
  ${ProductBrand}
`;

export const GET_PRODUCTS_TAGS = gql`
  query ProductsGetProductsTags($search: String, $where: ProductWhereInput) {
    allProducts(search: $search, sortBy: name_ASC, where: $where) {
      id
      ...ProductTags
    }
  }
  ${ProductTags}
`;

export const GET_PRODUCTS_VARIANTS = gql`
  query ProductsGetProductsVariants(
    $search: String
    $where: ProductWhereInput
  ) {
    allProducts(search: $search, sortBy: name_ASC, where: $where) {
      id
      ...ProductVariants
    }
  }
  ${ProductVariants}
`;
