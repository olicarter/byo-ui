import {gql} from '@apollo/client';

import {Container} from './Container';
import {Unit} from './Unit';

export const ProductVariant = gql `
  fragment ProductVariant on ProductVariant {
    id
    container {
      ...Container
    }
    increment
    incrementPrice
    unit {
      ...Unit
    }
  }
  ${Container}
  ${Unit}
`;
