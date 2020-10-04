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
