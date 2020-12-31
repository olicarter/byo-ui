import { gql } from '@apollo/client';

import { ProductTags } from '@fragments';

export const GET_PRODUCT_TAGS = gql`
  query TagListGetProductTags($id: ID!) {
    Product(where: { id: $id }) {
      id
      ...ProductTags
    }
  }
  ${ProductTags}
`;
