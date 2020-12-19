import { gql } from '@apollo/client';

import { Setting } from '@fragments';

export const GET_ALL_SETTINGS = gql`
  query CheckoutPageGetAllSettings {
    allSettings {
      ...Setting
    }
  }
  ${Setting}
`;
