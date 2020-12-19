import { gql } from '@apollo/client';

import { User } from '@fragments';

export const GET_AUTHENTICATED_USER = gql`
  query UserSubmittedOrdersGetAuthenticatedUser {
    authenticatedUser {
      ...User
    }
  }
  ${User}
`;
