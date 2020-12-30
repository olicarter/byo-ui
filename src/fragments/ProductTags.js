import { gql } from '@apollo/client';

import { Tag } from './Tag';

export const ProductTags = gql`
  fragment ProductTags on Product {
    tags(sortBy: name_ASC) {
      ...Tag
    }
  }
  ${Tag}
`;
