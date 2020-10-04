import { gql } from '@apollo/client';

export const GET_ALL_SETTINGS = gql`
  query HomeGetAllSettings {
    allSettings {
      homeContent
    }
  }
`;
