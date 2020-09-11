import { gql } from '@apollo/client';

const UnpaidOrder = gql`
  fragment UnpaidOrder on User {
    id
    orders(where: { paid_not: true }) {
      id
      paid
    }
  }
`;

export const fragments = { UnpaidOrder };

export const GET_USER = gql`
  query($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      id
      ...UnpaidOrder
    }
  }
  ${fragments.UnpaidOrder}
`;

export const CREATE_ORDER_ITEM = gql`
  mutation($data: OrderItemCreateInput!) {
    createOrderItem(data: $data) {
      id
    }
  }
`;
