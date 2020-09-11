import { gql } from '@apollo/client';

export const GET_USER = gql`
  query($netlifyId: String!, $productId: ID!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      id
      orders(where: { paid_not: true }) {
        id
        paid
        orderItems(where: { product: { id: $productId } }) {
          id
          quantity
        }
      }
    }
  }
`;

export const CREATE_ORDER_ITEM = gql`
  mutation($data: OrderItemCreateInput!) {
    createOrderItem(data: $data) {
      id
    }
  }
`;

export const UPDATE_ORDER_ITEM = gql`
  mutation($id: ID!, $quantity: Int!) {
    updateOrderItem(id: $id, data: { quantity: $quantity }) {
      id
    }
  }
`;

export const DELETE_ORDER_ITEM = gql`
  mutation($id: ID!) {
    deleteOrderItem(id: $id) {
      id
    }
  }
`;
