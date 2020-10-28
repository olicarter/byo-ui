import { gql } from '@apollo/client';

import { Product, User } from '../../fragments';

export const GET_PRODUCTS = gql`
  query ProductsGetProducts {
    allProducts {
      ...Product
    }
  }
  ${Product}
`;

export const GET_AUTHENTICATED_USER = gql`
  query ProductsGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;
