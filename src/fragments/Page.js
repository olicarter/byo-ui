import { gql } from '@apollo/client';

export const Page = gql`
  fragment Page on Page {
    id
    heading
    info
    message
    name
    path
    title
  }
`;
