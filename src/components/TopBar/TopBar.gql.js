import { gql } from '@apollo/client';

export const GET_SETTINGS = gql`
  query TopBarGetSettings {
    allSettings {
      facebookUrl
      instagramUrl
    }
  }
`;
