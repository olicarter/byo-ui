import { gql } from '@apollo/client';

import { OrderItem, Orders } from '../../fragments';

export const GET_USER = gql`
  query AddToOrderButtonGetUserOrders($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      id
      ...Orders
    }
  }
  ${Orders}
`;

export const CREATE_ORDER_ITEM = gql`
  mutation CreateOrderItem($data: OrderItemCreateInput!) {
    createOrderItem(data: $data) {
      ...OrderItem
    }
  }
  ${OrderItem}
`;

export const UPDATE_ORDER_ITEM = gql`
  mutation UpdateOrderItem($id: ID!, $quantity: Int!) {
    updateOrderItem(id: $id, data: { quantity: $quantity }) {
      ...OrderItem
    }
  }
  ${OrderItem}
`;

export const DELETE_ORDER_ITEM = gql`
  mutation DeleteOrderItem($id: ID!) {
    deleteOrderItem(id: $id) {
      ...OrderItem
    }
  }
  ${OrderItem}
`;
