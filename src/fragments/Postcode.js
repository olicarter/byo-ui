import { gql } from '@apollo/client';

export const Postcode = gql`
  fragment Postcode on Postcode {
    id
    postcode
  }
`;
