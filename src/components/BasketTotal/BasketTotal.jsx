import { useQuery } from '@apollo/client';

import { getUnsubmittedOrderFromUser, sumOrderItems } from '@helpers';
import { GET_AUTHENTICATED_USER } from './BasketTotal.gql';

export const BasketTotal = ({ showCurrencySymbol } = {}) => {
  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const { orderItems = [] } = getUnsubmittedOrderFromUser(authenticatedUser);

  let { total } = sumOrderItems(orderItems);
  // const productsTotal = products.toFixed(2);
  // const containersTotal = containers.toFixed(2);
  total = total.toFixed(2);

  return `${showCurrencySymbol ? '£' : ''}${total}`;
};
