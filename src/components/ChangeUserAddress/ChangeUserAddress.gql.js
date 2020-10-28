import { gql } from '@apollo/client';

import { User, Address } from '../../fragments';

export const GET_AUTHENTICATED_USER = gql`
  query UserAddressFormGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;

export const UPDATE_ADREESS_BY_NETLIFY_ID = gql`
  mutation UpdateUserAdress(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
    $street: String!
    $flatNumber: String!
    $postCode: String!
  ) {
    updateAddress(
      id: $id
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
