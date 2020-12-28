import { gql } from '@apollo/client';

import { ProductDetails, Setting, User } from '@fragments';

export const GET_AUTHENTICATED_USER = gql`
  query AppGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;

export const GET_PRODUCTS = gql`
  query AppGetProducts {
    allProducts {
      ...ProductDetails
    }
  }
  ${ProductDetails}
`;

export const GET_SETTINGS = gql`
  query AppGetSettings {
    allSettings {
      ...Setting
    }
  }
  ${Setting}
`;
