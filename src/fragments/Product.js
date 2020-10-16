import { gql } from '@apollo/client';

import { Category } from './Category';
import { ProductVariant } from './ProductVariant';
import { Tag } from './Tag';

export const Product = gql`
  fragment Product on Product {
    id
    name
    slug
    category {
      ...Category
    }
    allergenInfo
    ingredients
    origin
    tags {
      ...Tag
    }
    variants {
      ...ProductVariant
    }
  }
  ${Category}
  ${ProductVariant}
  ${Tag}
`;
