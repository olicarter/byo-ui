import { gql } from '@apollo/client';

export const GET_TAGS_QUERY = gql`
  query {
    allTags(sortBy: name_ASC) {
      id
      name
      slug
    }
  }
`;
