import { gql } from '@apollo/client';

import { Orders } from './Orders';

export const User = gql`
  fragment User on User {
    id
    firstName
    lastName
    email
    netlifyId
    ...Orders
  }
  ${Orders}
`;
