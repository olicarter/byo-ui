import { gql } from '@apollo/client';

import { Address, User, Order } from '../../fragments';

export const GET_AUTHENTICATED_USER = gql`
  query UserAddressFormGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;

export const CREATE_ADREESS_BY_NETLIFY_ID = gql`
  mutation CreateUserAdress(
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $street: String!
    $flatNumber: String!
    $postCode: String!
  ) {
    createAddress(
      data: {
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
        street: $street
        flatNumber: $flatNumber
        postCode: $postCode
      }
    ) {
      ...Address
    }
  }
  ${Address}
`;

export const SET_ORDER_ADDRESS = gql`
  mutation UpdateOrder($id: ID!, $addressId: ID!) {
    updateOrder(id: $id, data: { address: { connect: { id: $addressId } } }) {
      ...Order
    }
  }
  ${Order}
`;
