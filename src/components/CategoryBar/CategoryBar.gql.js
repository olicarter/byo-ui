import { gql } from '@apollo/client';

export const GET_CATEGORIES_QUERY = gql`
  query GetAllCategories {
    allCategories(sortBy: name_ASC) {
      id
      name
      slug
    }
  }
`;
