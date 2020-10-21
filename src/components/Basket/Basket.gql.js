import { gql } from '@apollo/client';

import { Order, User } from '../../fragments';

export const GET_SETTINGS = gql`
  query BasketGetSettings {
    allSettings {
      chooseDeliverySlotInfo
      minOrderValue
      orderSubmissionInfo
    }
  }
`;

export const GET_USERS_BY_NETLIFY_ID = gql`
  query BasketGetUsersByNetlifyId($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      ...User
    }
  }
  ${User}
`;

export const SUBMIT_ORDER = gql`
  mutation BasketSubmitOrder($id: ID!) {
    updateOrder(id: $id, data: { submitted: true }) {
      ...Order
    }
  }
  ${Order}
`;
