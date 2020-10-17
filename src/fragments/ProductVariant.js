import { gql } from '@apollo/client';

import { Container } from './Container';
import { Tag } from './Tag';
import { Unit } from './Unit';

export const ProductVariant = gql`
  fragment ProductVariant on ProductVariant {
    id
    container {
      ...Container
    }
    increment
    incrementPrice
    tags {
      ...Tag
    }
    unit {
      ...Unit
    }
  }
  ${Container}
  ${Tag}
  ${Unit}
`;
