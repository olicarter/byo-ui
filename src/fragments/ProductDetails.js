import { gql } from '@apollo/client';

export const ProductDetails = gql`
  fragment ProductDetails on Product {
    id
    name
    slug
    allergenInfo
    description
    image {
      id
      publicUrl
    }
    ingredients
    origin
  }
`;
