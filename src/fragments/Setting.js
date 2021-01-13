import { gql } from '@apollo/client';

export const Setting = gql`
  fragment Setting on Setting {
    id
    chooseDeliverySlotInfo
    facebookUrl
    footerContent
    instagramUrl
    minOrderValue
    orderSubmissionInfo
  }
`;
