import { gql } from '@apollo/client';

export const OrderItem = gql`
  fragment OrderItem on OrderItem {
    id
    product {
      id
      increments
      name
      price
      slug
      unit
    }
    quantity
  }
`;

export const OrderItems = gql`
  fragment OrderItems on Order {
    orderItems {
      ...OrderItem
    }
  }
  ${OrderItem}
`;

export const Orders = gql`
  fragment Orders on User {
    orders {
      id
      paid
      ...OrderItems
    }
  }
  ${OrderItems}
`;
