import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useAuth } from '../../contexts';
import { sumOrderItems } from '../../helpers';
import { GET_USERS_BY_NETLIFY_ID } from './BasketTotal.gql';

export const BasketTotal = ({ showCurrencySymbol } = {}) => {
  const { user } = useAuth();
  const { sub: auth0Id } = user || {};

  const [getUser, { data: { allUsers } = {} }] = useLazyQuery(
    GET_USERS_BY_NETLIFY_ID,
    {
      variables: { auth0Id },
    },
  );

  useEffect(() => {
    if (auth0Id) getUser();
  }, [auth0Id, getUser]);

  const [{ orders = [] } = {}] = allUsers || [];
  const { orderItems = [] } = orders.find(({ submitted }) => !submitted) || {};

  let { total } = sumOrderItems(orderItems);
  // const productsTotal = products.toFixed(2);
  // const containersTotal = containers.toFixed(2);
  total = total.toFixed(2);

  return `${showCurrencySymbol ? '£' : ''}${total}`;
};
