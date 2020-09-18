import { gql } from '@apollo/client';

export const Unit = gql`
  fragment Unit on Unit {
    id
    singular
    plural
    singularAbbreviated
    pluralAbbreviated
  }
`;

export const Product = gql`
  fragment Product on Product {
    id
    increments
    name
    price
    slug
    tags {
      id
      slug
    }
    unit {
      ...Unit
    }
  }
  ${Unit}
`;

export const OrderItem = gql`
  fragment OrderItem on OrderItem {
    id
    product {
      ...Product
    }
    quantity
  }
  ${Product}
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
