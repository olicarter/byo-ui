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

export const GET_USERS_BY_NETLIFY_ID = gql`
  query ProductsGetUsersByNetlifyId($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      ...User
    }
  }
  ${User}
`;
