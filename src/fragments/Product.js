import { gql } from '@apollo/client';

import { Category } from './Category';
import { ProductVariant } from './ProductVariant';
import { Tag } from './Tag';

export const Product = gql`
  fragment Product on Product {
    id
    name
    slug
    allergenInfo
    category {
      ...Category
    }
    deliveryInfo
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
