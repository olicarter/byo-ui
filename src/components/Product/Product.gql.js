import { gql } from '@apollo/client';

export const GET_PRODUCT_QUERY = gql`
  query($id: ID!) {
    product(where: { id: $id }) {
      id
      increments
      name
      price
      slug
      unit
    }
  }
`;
