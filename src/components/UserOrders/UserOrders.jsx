import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useAuth } from '../../contexts';
import { GET_USERS_BY_NETLIFY_ID } from './UserOrders.gql';
import * as Styled from './UserOrders.styled';
import { SubTitle } from '../Typography';
import { UserOrdersProductOrderItems } from './UserOrdersProductOrderItems';

export const UserOrders = () => {
  const { user: authUser } = useAuth();
  const { id: netlifyId } = authUser || {};

  const [getUsersByNetlifyId, { data: { allUsers } = {} }] = useLazyQuery(
    GET_USERS_BY_NETLIFY_ID,
  );

  const [{ orders = [] } = {}] = allUsers || [];

  // if (orders.length) {
  //   orders[0].orderItems.sort((a, b) => {
  //     console.log(a);
  //     return a.productVariant.product.name.localeCompare(
  //       b.productVariant.product.name,
  //     );
  //   });
  // }

  useEffect(() => {
    if (netlifyId) getUsersByNetlifyId({ variables: { netlifyId } });
  }, [netlifyId, getUsersByNetlifyId]);

  return (
    <Styled.Column>
      {orders.map(({ id, orderItems = [], paidAt }) => {
        const orderItemsByProduct = [];
        const uniqueProductIds = [];
        orderItems.forEach(i => {
          if (!uniqueProductIds.includes(i.productVariant.product.id)) {
            uniqueProductIds.push(i.productVariant.product.id);
          }
          const uniqueProductIdIndex = uniqueProductIds.indexOf(
            i.productVariant.product.id,
          );
          orderItemsByProduct[uniqueProductIdIndex] = [
            ...(orderItemsByProduct[uniqueProductIdIndex] || []),
            i,
          ];
        });

        const { totalContainerPrice = 0 } = orderItems.reduce(
          (prevVal, currVal) => {
            if (currVal.productVariant.container)
              return {
                ...prevVal,
                totalContainerPrice:
                  prevVal.totalContainerPrice +
                  currVal.quantity *
                    Number(currVal.productVariant.container.price),
              };
            else return prevVal;
          },
          {
            productVariant: { container: { price: 0 } },
            totalContainerPrice: 0,
            quantity: 0,
          },
        );

        return (
          <Styled.UserOrders>
            <SubTitle>Your orders</SubTitle>

            <Styled.Section>
              <Styled.Header as="header">
                <span>#{id}</span>
                <div>
                  <span>
                    £
                    {Math.round(
                      orderItems.reduce(
                        (prev, curr) =>
                          prev +
                          Number(curr.quantity) *
                            Number(curr.productVariant.incrementPrice),
                        0,
                      ) * 100,
                    ) / 100}
                  </span>
                  <span>
                    {totalContainerPrice ? (
                      <span> + £{+parseFloat(totalContainerPrice)}</span>
                    ) : null}
                  </span>
                </div>
              </Styled.Header>
            </Styled.Section>

            <Styled.Section>
              <Styled.Row>
                <Styled.Date>
                  {paidAt
                    ? new Date(paidAt).toDateString()
                    : 'Pending delivery'}
                </Styled.Date>
              </Styled.Row>
            </Styled.Section>

            {orderItemsByProduct.map(orderItems => (
              <UserOrdersProductOrderItems orderItems={orderItems} />
            ))}
          </Styled.UserOrders>
        );
      })}
    </Styled.Column>
  );
};
