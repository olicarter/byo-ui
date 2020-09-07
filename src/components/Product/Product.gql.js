import { gql } from '@apollo/client';

export const GET_PRODUCT_QUERY = gql`
  query($id: ID!) {
    Product(where: { id: $id }) {
      id
      increments
      name
      price
      slug
      unit
    }
  }
`;
