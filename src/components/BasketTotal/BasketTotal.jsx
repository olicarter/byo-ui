import { useQuery } from '@apollo/client';

import { sumOrderItems } from '../../helpers';
import { GET_AUTHENTICATED_USER } from './BasketTotal.gql';

export const BasketTotal = ({ showCurrencySymbol } = {}) => {
  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const { orders = [] } = authenticatedUser || {};
  const { orderItems = [] } = orders.find(({ submitted }) => !submitted) || {};

  let { total } = sumOrderItems(orderItems);
  // const productsTotal = products.toFixed(2);
  // const containersTotal = containers.toFixed(2);
  total = total.toFixed(2);

  return `${showCurrencySymbol ? '£' : ''}${total}`;
};
