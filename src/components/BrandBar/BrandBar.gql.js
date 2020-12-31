import { gql } from '@apollo/client';

export const GET_ALL_BRANDS = gql`
  query BrandBarGetBrands {
    allBrands(sortBy: name_ASC) {
      id
      name
      slug
    }
  }
`;
