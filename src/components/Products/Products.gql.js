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

export const GET_USERS_BY_AUTH0_ID = gql`
  query ProductsGetUsersByAuth0Id($auth0Id: String!) {
    allUsers(where: { auth0Id: $auth0Id }) {
      ...User
    }
  }
  ${User}
`;
