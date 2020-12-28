import { gql } from '@apollo/client';

import { ProductVariant } from './ProductVariant';

export const ProductVariants = gql`
  fragment ProductVariants on Product {
    variants {
      ...ProductVariant
    }
  }
  ${ProductVariant}
`;
