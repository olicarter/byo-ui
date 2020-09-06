import { gql } from '@apollo/client';

export const GET_TAGS_QUERY = gql`
  query {
    tags {
      id
      name
      slug
    }
  }
`;
