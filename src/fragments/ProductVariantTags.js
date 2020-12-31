import { gql } from '@apollo/client';

import { Tag } from './Tag';

export const ProductVariantTags = gql`
  fragment ProductVariantTags on ProductVariant {
    tags(sortBy: name_ASC) {
      ...Tag
    }
  }
  ${Tag}
`;
