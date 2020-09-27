import { gql } from '@apollo/client';

import { Product } from './Product';
import { ProductVariant } from './ProductVariant';

export const OrderItem = gql`
  fragment OrderItem on OrderItem {
    id
    productVariant {
      ...ProductVariant
      product {
        ...Product
      }
    }
    quantity
  }
  ${Product}
  ${ProductVariant}
`;
