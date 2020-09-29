import { gql } from '@apollo/client';

export const Container = gql`
  fragment Container on Container {
    id
    price
    size
    type
    unit
  }
`;
