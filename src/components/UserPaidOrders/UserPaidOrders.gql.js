import { gql } from '@apollo/client';

export const GET_USER = gql`
  query($netlifyId: String!) {
    allUsers(where: { netlifyId: $netlifyId }) {
      id
      orders(where: { paid: true }) {
        id
        paidAt
        orderItems {
          id
          quantity
          productVariant {
            id
            increment
            incrementPrice
            container {
              id
              price
              type
            }
            product {
              id
              name
            }
            unit {
              id
              pluralAbbreviated
              singularAbbreviated
            }
          }
        }
      }
    }
  }
`;
