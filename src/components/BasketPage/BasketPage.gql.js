import { gql } from '@apollo/client';

export const GET_ALL_SETTINGS = gql`
  query BasketPageGetAllSettings {
    allSettings {
      basketHeaderContent
      minOrderValue
    }
  }
`;
