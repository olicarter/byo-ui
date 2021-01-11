import { gql } from '@apollo/client';

import { Page } from '@fragments';

export const GET_PAGES_BY_PATH = gql`
  query GetPagesByPath($path: String!) {
    allPages(where: { path: $path }) {
      ...Page
    }
  }
  ${Page}
`;
