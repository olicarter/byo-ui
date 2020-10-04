import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useAuth } from '../../contexts';
import { GET_USERS_BY_NETLIFY_ID } from './UserPaidOrders.gql';
// import * as Styled from './UserPaidOrders.styled';

export const UserPaidOrders = () => {
  const { user: authUser } = useAuth();
  const { id: netlifyId } = authUser || {};

  const [getUsersByNetlifyId, { data: { allUsers } = {} }] = useLazyQuery(
    GET_USERS_BY_NETLIFY_ID,
  );

  const [{ orders = [] } = {}] = allUsers || [];

  useEffect(() => {
    if (netlifyId) getUsersByNetlifyId({ variables: { netlifyId } });
  }, [netlifyId, getUsersByNetlifyId]);

  return (
    <div>
      {orders.map(({ orderItems, id, paidAt }) => (
        <>
          <p>{id}</p>
          <p>{paidAt}</p>
          {orderItems.map(({ product: { name }, quantity }) => (
            <>
              <p>{name}</p>
              <p>{quantity}</p>
            </>
          ))}
        </>
      ))}
    </div>
  );
};
