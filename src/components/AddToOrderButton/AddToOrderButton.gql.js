import { gql } from '@apollo/client';

export const CREATE_ORDER_ITEM = gql`
  mutation($data: OrderItemCreateInput!) {
    createOrderItem(data: $data) {
      id
    }
  }
`;
