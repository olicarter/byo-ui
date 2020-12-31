import { gql } from '@apollo/client';

import { ProductBrand } from '@fragments';

export const GET_PRODUCT_BRAND = gql`
  query BrandNameGetProductBrand($id: ID!) {
    Product(where: { id: $id }) {
      id
      ...ProductBrand
    }
  }
  ${ProductBrand}
`;
