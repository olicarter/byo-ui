import { gql } from '@apollo/client';

import { Brand } from './Brand';

export const ProductBrand = gql`
  fragment ProductBrand on Product {
    brand {
      ...Brand
    }
  }
  ${Brand}
`;
