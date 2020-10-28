import { gql } from '@apollo/client';

import { Order, User } from '../../fragments';

export const GET_SETTINGS = gql`
  query CheckoutGetSettings {
    allSettings {
      chooseDeliverySlotInfo
      minOrderValue
      orderSubmissionInfo
    }
  }
`;

export const GET_USERS_BY_NETLIFY_ID = gql`
  query CheckoutGetUsersByAuth0Id($auth0Id: String!) {
    allUsers(where: { auth0Id: $auth0Id }) {
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
