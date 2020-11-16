import { gql } from '@apollo/client';

import { Order, Postcode, Setting, User } from '../../fragments';

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

export const GET_POSTCODE = gql`
  query CheckoutGetPostcode($postcode: String!) {
    allPostcodes(where: { postcode: $postcode }) {
      ...Postcode
    }
  }
  ${Postcode}
`;

export const SUBMIT_ORDER = gql`
  mutation CheckoutSubmitOrder(
    $id: ID!
    $address: String!
    $name: String!
    $phone: String!
    $postcodeId: ID!
  ) {
    updateOrder(
      id: $id
      data: {
        address: {
          create: {
            address: $address
            name: $name
            phone: $phone
            postcode: { connect: { id: $postcodeId } }
          }
        }
        submitted: true
      }
    ) {
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
