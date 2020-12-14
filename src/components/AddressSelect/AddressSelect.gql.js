import { gql } from '@apollo/client';

import { Order, User } from '../../fragments';

export const GET_AUTHENTICATED_USER = gql`
  query BasketIconGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;

export const SET_ORDER_ADDRESS = gql`
  mutation AddressSelectUpdateOrderAddress(
    $id: ID!
    $address: AddressRelateToOneInput!
  ) {
    updateOrder(id: $id, data: { address: $address }) {
      ...Order
    }
  }
  ${Order}
`;
