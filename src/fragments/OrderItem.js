import { gql } from '@apollo/client';

import { ProductBrand } from './ProductBrand';
import { ProductDetails } from './ProductDetails';
import { ProductTags } from './ProductTags';
import { ProductVariant } from './ProductVariant';
import { ProductVariants } from './ProductVariants';

export const OrderItem = gql`
  fragment OrderItem on OrderItem {
    id
    productVariant {
      ...ProductVariant
      product {
        ...ProductDetails
        ...ProductBrand
        ...ProductTags
        ...ProductVariants
      }
    }
    quantity
  }
  ${ProductVariant}
  ${ProductDetails}
  ${ProductBrand}
  ${ProductTags}
  ${ProductVariants}
`;
