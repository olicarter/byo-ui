import { gql } from '@apollo/client';

import { Page, Setting, User } from '@fragments';

export const GET_AUTHENTICATED_USER = gql`
  query AppGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;

export const GET_PAGES = gql`
  query AppGetPages {
    allPages {
      ...Page
    }
  }
  ${Page}
`;

export const GET_SETTINGS = gql`
  query AppGetSettings {
    allSettings {
      ...Setting
    }
  }
  ${Setting}
`;
