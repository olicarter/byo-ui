import { gql } from '@apollo/client';

import { Brand } from './Brand';
import { Category } from './Category';
import { ProductVariant } from './ProductVariant';
import { Tag } from './Tag';

export const Product = gql`
  fragment Product on Product {
    id
    name
    slug
    allergenInfo
    brand {
      ...Brand
    }
    category {
      ...Category
    }
    deliveryInfo
    image {
      id
      publicUrl
    }
    ingredients
    origin
    tags {
      ...Tag
    }
    variants {
      ...ProductVariant
    }
  }
  ${Brand}
  ${Category}
  ${ProductVariant}
  ${Tag}
`;
