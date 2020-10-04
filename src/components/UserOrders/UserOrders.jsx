import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useAuth } from '../../contexts';
import { GET_USERS_BY_NETLIFY_ID } from './UserOrders.gql';
import * as Styled from './UserOrders.styled';
import { SubTitle } from '../Typography';

export const UserOrders = () => {
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
          <Styled.Section>
            <Styled.Header as="header">
              <span>#{id}</span>
              <span>Total price</span>
            </Styled.Header>
          </Styled.Section>

          <Styled.Section>
            <Styled.Row>
              <Styled.Date>
                {paidAt ? new Date(paidAt).toDateString() : 'Pending delivery'}
              </Styled.Date>
            </Styled.Row>
          </Styled.Section>

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
              <Styled.Section>
                <Styled.Row bold>
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
              </Styled.Section>
            ),
          )}
        </>
      ))}
    </Styled.Column>
  );
};
