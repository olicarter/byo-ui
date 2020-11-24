import { gql } from '@apollo/client';

export const Setting = gql`
  fragment Setting on Setting {
    id

    aboutHeader
    accountHeader
    basketHeader
    blogHeader
    checkoutHeader
    loginHeader
    registerHeader
    shopHeader

    aboutContent
    footerContent
    homeContent

    facebookUrl
    instagramUrl

    chooseDeliverySlotInfo

    minOrderValue
    orderSubmissionInfo
  }
`;
