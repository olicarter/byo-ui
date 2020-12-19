import { gql } from '@apollo/client';

import { Setting } from '../../fragments';

export const GET_SETTINGS = gql`
  query CalloutGetSettings {
    allSettings {
      ...Setting
    }
  }
  ${Setting}
`;
