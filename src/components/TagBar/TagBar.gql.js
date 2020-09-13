import { gql } from '@apollo/client';

export const GET_TAGS_QUERY = gql`
  query GetAllTags {
    allTags(sortBy: name_ASC) {
      id
      name
      slug
    }
  }
`;
