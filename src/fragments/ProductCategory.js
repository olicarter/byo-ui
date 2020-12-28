import { gql } from '@apollo/client';

import { Category } from './Category';

export const ProductCategory = gql`
  fragment ProductCategory on Product {
    category {
      ...Category
    }
  }
  ${Category}
`;
