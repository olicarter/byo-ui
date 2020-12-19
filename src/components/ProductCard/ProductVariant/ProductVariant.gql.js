import { gql } from '@apollo/client';

import { Order, OrderItem, User } from '@fragments';

export const GET_AUTHENTICATED_USER = gql`
  query ProductVariantGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;

export const CREATE_ORDER_ITEM = gql`
  mutation CreateOrderItem($data: OrderItemCreateInput!) {
    createOrderItem(data: $data) {
      ...OrderItem
      order {
        ...Order
      }
    }
  }
  ${OrderItem}
  ${Order}
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
