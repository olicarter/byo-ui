import {gql} from '@apollo/client';

export const GET_USER = gql `
  query($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      id
      orders(where: { paid: true }) {
        id
        paid
        orderItems {
            id
            product{
                id
                name
                }
            quantity
            }
        paidAt
      }
    }
  }
`;
