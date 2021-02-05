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

export const DECREMENT_ORDER_ITEM = gql`
  mutation DecrementOrderItem($id: ID!) {
    decrementOrderItem(id: $id) {
      id
      quantity
    }
  }
`;

export const INCREMENT_ORDER_ITEM = gql`
  mutation IncrementOrderItem($id: ID!) {
    incrementOrderItem(id: $id) {
      id
      quantity
    }
  }
`;

export const DELETE_ORDER_ITEM = gql`
  mutation DeleteOrderItem($id: ID!) {
    deleteOrderItem(id: $id) {
      ...OrderItem
    }
  }
  ${OrderItem}
`;
