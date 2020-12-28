import { gql } from '@apollo/client';

import { ProductDetails } from './ProductDetails';
import { ProductVariant } from './ProductVariant';

export const OrderItem = gql`
  fragment OrderItem on OrderItem {
    id
    productVariant {
      ...ProductVariant
      product {
        ...ProductDetails
      }
    }
    quantity
  }
  ${ProductDetails}
  ${ProductVariant}
`;
