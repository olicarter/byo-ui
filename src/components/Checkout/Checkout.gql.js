import { gql } from '@apollo/client';

import { Order, Setting, User } from '../../fragments';

export const GET_SETTINGS = gql`
  query CheckoutGetSettings {
    allSettings {
      ...Setting
    }
  }
  ${Setting}
`;

export const GET_AUTHENTICATED_USER = gql`
  query CheckoutGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;

export const SUBMIT_ORDER = gql`
  mutation CheckoutSubmitOrder($id: ID!, $address: AddressRelateToOneInput!) {
    updateOrder(id: $id, data: { address: $address, submitted: true }) {
      ...Order
    }
  }
  ${Order}
`;

export const UPDATE_AUTHENTICATED_USER = gql`
  mutation CheckoutUpdateAuthenticatedUser($addressId: ID!) {
    updateAuthenticatedUser(
      data: { addresses: { connect: { id: $addressId } } }
    ) {
      ...User
    }
  }
  ${User}
`;
