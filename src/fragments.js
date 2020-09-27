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

export const Container = gql`
  fragment Container on Container {
    id
    price
    type
    unit
    volume
  }
`;

export const ProductVariant = gql`
  fragment ProductVariant on ProductVariant {
    id
    increment
    incrementPrice
    container {
      ...Container
    }
    unit {
      ...Unit
    }
  }
  ${Container}
  ${Unit}
`;

export const Product = gql`
  fragment Product on Product {
    id
    name
    slug
    tags {
      id
      slug
    }
    variants {
      ...ProductVariant
    }
  }
  ${ProductVariant}
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
