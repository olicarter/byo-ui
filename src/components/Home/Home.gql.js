import { gql } from '@apollo/client';

import { Setting } from '@fragments';

export const GET_ALL_SETTINGS = gql`
  query HomeGetAllSettings {
    allSettings {
      ...Setting
    }
  }
  ${Setting}
`;
