import { gql } from '@apollo/client';

import { Address, User } from '@fragments';

export const GET_AUTHENTICATED_USER = gql`
  query OrderDeliveryAddressNameInputGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;

export const GET_ADDRESS_BY_ID = gql`
  query OrderDeliveryAddressPhoneInputGetAddressById($id: ID!) {
    Address(where: { id: $id }) {
      ...Address
    }
  }
  ${Address}
`;
