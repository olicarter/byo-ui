import { gql } from '@apollo/client';

export const GET_POSTCODE = gql`
  query PostcodeInputGetPostcode($postcode: String!) {
    _allPostcodesMeta(where: { postcode_i: $postcode }) {
      count
    }
  }
`;
