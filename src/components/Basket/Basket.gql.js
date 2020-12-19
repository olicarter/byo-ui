import { gql } from '@apollo/client';

import { Setting, User } from '@fragments';

export const GET_SETTINGS = gql`
  query BasketGetSettings {
    allSettings {
      ...Setting
    }
  }
  ${Setting}
`;

export const GET_AUTHENTICATED_USER = gql`
  query BasketGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;
