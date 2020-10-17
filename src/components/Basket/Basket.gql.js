import { gql } from '@apollo/client';

import { Order, User } from '../../fragments';

export const GET_USER = gql`
  query BasketGetUser($netlifyId: String!) {
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
