import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useAuth } from '../../contexts';
import { GET_USERS_BY_NETLIFY_ID } from './UserPaidOrders.gql';
import * as Styled from './UserPaidOrders.styled';

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
    <Styled.Column>
      {orders.map(({ orderItems, id, paidAt }) => (
        <>
          <Styled.Row>
            <h4>{id}</h4>
            <h4>Total price</h4>
          </Styled.Row>
          <Styled.Row>
            <Styled.Date>{new Date(paidAt).toDateString()}</Styled.Date>
          </Styled.Row>
          {orderItems.map(
            ({
              quantity,
              productVariant: {
                container,
                increment,
                incrementPrice,
                product: { name },
                unit,
              },
            }) => (
              <>
                <Styled.Row>
                  <Styled.Name>{name}</Styled.Name>
                  <span>Price</span>
                </Styled.Row>
                <Styled.Row>
                  <span>
                    {quantity} x {increment}
                    {unit.pluralAbbreviated}
                    {container ? ` + ${container.type}` : ''}
                  </span>
                  {incrementPrice}
                </Styled.Row>
              </>
            ),
          )}
        </>
      ))}
    </Styled.Column>
  );
};
