import { gql } from '@apollo/client';

import { Address, User, Order } from '@fragments';

export const GET_AUTHENTICATED_USER = gql`
  query UserAddressFormGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;

export const GET_POSTCODE = gql`
  query UserAddressFormGetPostcode($postcode: String!) {
    _allPostcodesMeta(where: { postcode: $postcode }) {
      count
    }
  }
`;

export const CREATE_ADREESS_BY_NETLIFY_ID = gql`
  mutation CreateUserAdress(
    $name: String!
    $phoneNumber: String!
    $street: String!
    $flatNumber: String!
    $postcode: String!
  ) {
    createAddress(
      data: {
        name: $name
        phoneNumber: $phoneNumber
        street: $street
        flatNumber: $flatNumber
        postcode: $postcode
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
    $phone: String!
    $address: String!
    $postcode: String!
  ) {
    updateOrder(
      id: $id
      data: {
        address: {
          create: {
            address: $address
            name: $name
            phone: $phone
            postcode: $postcode
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
