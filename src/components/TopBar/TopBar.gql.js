import { gql } from '@apollo/client';

import { Setting } from '../../fragments';

export const GET_SETTINGS = gql`
  query TopBarGetSettings {
    allSettings {
      ...Setting
    }
  }
  ${Setting}
`;
