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
  mutation CheckoutSubmitOrder($id: ID!) {
    updateOrder(id: $id, data: { submitted: true }) {
      ...Order
    }
  }
  ${Order}
`;
