import { useQuery } from '@apollo/client';

import {
  formatPrice,
  getUnsubmittedOrderFromUser,
  sumOrderItems,
} from '@helpers';

import { GET_AUTHENTICATED_USER } from './BasketTotal.gql';

export const BasketTotal = ({ showCurrencySymbol } = {}) => {
  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const { deliverySlot, orderItems = [] } = getUnsubmittedOrderFromUser(
    authenticatedUser,
  );

  const { deliveryCharge = 0 } = deliverySlot || {};

  let { total } = sumOrderItems(orderItems);
  // const productsTotal = products.toFixed(2);
  // const containersTotal = containers.toFixed(2);

  return `${showCurrencySymbol ? '£' : ''}${formatPrice(
    Number(total) + Number(deliveryCharge),
  )}`;
};
