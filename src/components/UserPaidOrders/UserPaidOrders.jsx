import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_USER } from './UserPaidOrders.gql';
import { useAuth } from '../../contexts';
import * as Styled from './UserPaidOrders.styled';

export const UserPaidOrders = () => {
  const { user: authUser } = useAuth();
  const { id: netlifyId } = authUser || {};
  const [getOrder, { data: { allUsers } = {} }] = useLazyQuery(GET_USER, {
    variables: { netlifyId },
  });
  const [{ orders = [] } = {}] = allUsers || [];
  useEffect(() => {
    if (netlifyId) getOrder();
  }, [netlifyId, getOrder]);
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
