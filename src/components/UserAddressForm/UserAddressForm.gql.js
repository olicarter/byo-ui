import { gql } from '@apollo/client';

import { User } from '../../fragments';

export const GET_USERS_BY_NETLIFY_ID = gql`
  query UserAddressFormGetUsersByNetlifyId($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      ...User
    }
  }
  ${User}
`;

export const UPDATE_ADREESS_BY_NETLIFY_ID = gql`
mutation UpdateUserAdress(
  $id: ID!
  $streetName: String!
  $flatNumber: String!
  $postCode: String
){
  updateAddress(
    id: $id,
    data:{
      streetName: $streetName,
      flatNumber: $flatNumber,
      postCode: $postCode
    }
  ){
    ...User
  }
  ${User}
}`;
