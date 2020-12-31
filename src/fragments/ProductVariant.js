import { gql } from '@apollo/client';

import { Container } from './Container';
import { ProductVariantTags } from './ProductVariantTags';
import { Tag } from './Tag';
import { Unit } from './Unit';

export const ProductVariant = gql`
  fragment ProductVariant on ProductVariant {
    id
    increment
    incrementPrice
    name
    container {
      ...Container
    }
    image {
      id
      publicUrl
    }
    ...ProductVariantTags
    unit {
      ...Unit
    }
  }
  ${Container}
  ${ProductVariantTags}
  ${Tag}
  ${Unit}
`;
