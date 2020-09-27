import { gql } from '@apollo/client';

export const Unit = gql`
  fragment Unit on Unit {
    id
    singular
    plural
    singularAbbreviated
    pluralAbbreviated
  }
`;
