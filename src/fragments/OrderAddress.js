import { gql } from '@apollo/client';

export const OrderAddress = gql`
  fragment OrderAddress on OrderAddress {
    id
    firstName
    lastName
    phoneNumber
    street
    flatNumber
    postCode
  }
`;
