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
    $name: String!
    $phoneNumber: String!
    $street: String!
    $flatNumber: String!
    $postCode: String!
  ) {
    createAddress(
      data: {
        name: $name
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

export const UPDATE_ORDER_ADDRESS = gql`
  mutation UserAddressFormUpdateOrderAddress(
    $id: ID!
    $name: String!
    $phoneNumber: String!
    $street: String!
    $flatNumber: String!
    $postCode: String!
  ) {
    updateOrder(
      id: $id
      data: {
        address: {
          create: {
            name: $name
            phoneNumber: $phoneNumber
            street: $street
            flatNumber: $flatNumber
            postCode: $postCode
          }
        }
      }
    ) {
      ...Order
    }
  }
  ${Order}
`;

export const SET_ORDER_ADDRESS = gql`
  mutation UserAddressFormSetOrderAddress($id: ID!, $addressId: ID!) {
    updateOrder(id: $id, data: { address: { connect: { id: $addressId } } }) {
      ...Order
    }
  }
  ${Order}
`;
