import { gql } from '@apollo/client';

import { ProductBrand } from './ProductBrand';
import { ProductDetails } from './ProductDetails';
import { ProductTags } from './ProductTags';
import { ProductVariant } from './ProductVariant';
import { ProductVariants } from './ProductVariants';
import { Unit } from './Unit';

export const OrderItem = gql`
  fragment OrderItem on OrderItem {
    id
    isContainerReturned
    quantity
    productVariant {
      ...ProductVariant
      product {
        ...ProductDetails
        ...ProductBrand
        ...ProductTags
        ...ProductVariants
      }
    }

    # These fields are copied from Product, ProductVariant and Container
    # at time of order submission, to ensure the data doesn't change
    # in past orders screen.
    productName
    productBrandName
    productVariantName
    productVariantIncrement
    productVariantIncrementPrice
    productVariantUnit {
      ...Unit
    }
    productVariantContainerPrice
    productVariantContainerSize
    productVariantContainerUnit
    productVariantContainerType
  }
  ${ProductVariant}
  ${ProductDetails}
  ${ProductBrand}
  ${ProductTags}
  ${ProductVariants}
  ${Unit}
`;
