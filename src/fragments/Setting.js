import { gql } from '@apollo/client';

export const Setting = gql`
  fragment Setting on Setting {
    id
    aboutContent
    chooseDeliverySlotInfo
    facebookUrl
    homeContent
    instagramUrl
    minOrderValue
    orderSubmissionInfo
  }
`;
