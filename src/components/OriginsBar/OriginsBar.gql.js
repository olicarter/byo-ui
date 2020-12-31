import { gql } from '@apollo/client';

import { ProductDetails } from '@fragments';

export const GET_ALL_PRODUCTS = gql`
  query OriginsBarGetAllProducts {
    allProducts(sortBy: name_ASC) {
      ...ProductDetails
    }
  }
  ${ProductDetails}
`;
