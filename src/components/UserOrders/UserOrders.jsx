import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { DateTime } from 'luxon';

import { useAuth } from '../../contexts';
import { GET_USERS_BY_NETLIFY_ID } from './UserOrders.gql';
import * as Styled from './UserOrders.styled';
import { Card } from '../Card';
import { UserOrdersProductOrderItems } from './UserOrdersProductOrderItems';

export const UserOrders = () => {
  const { user: authUser } = useAuth();
  const { sub: auth0Id } = authUser || {};

  const [getUsersByAuth0Id, { data: { allUsers } = {} }] = useLazyQuery(
    GET_USERS_BY_NETLIFY_ID,
  );

  const [{ orders = [] } = {}] = allUsers || [];
  const submittedOrders = orders.filter(({ paid, submitted }) => submitted);

  useEffect(() => {
    if (auth0Id) getUsersByAuth0Id({ variables: { auth0Id } });
  }, [auth0Id, getUsersByAuth0Id]);

  return (
    <>
      {submittedOrders.map(
        ({
          id,
          deliverySlot: { startTime, endTime } = {},
          orderItems = [],
          paid,
        }) => {
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

          const totalOrderValue =
            Math.round(
              (orderItems.reduce(
                (prev, curr) =>
                  prev +
                  Number(curr.quantity) *
                    Number(curr.productVariant.incrementPrice),
                0,
              ) +
                totalContainerPrice) *
                100,
            ) / 100;

          const st = DateTime.fromISO(startTime, {
            zone: 'Europe/London',
          }).toLocaleString(DateTime.TIME_SIMPLE);
          const et = DateTime.fromISO(endTime, {
            zone: 'Europe/London',
          }).toLocaleString(DateTime.TIME_SIMPLE);
          const day = DateTime.fromISO(startTime, {
            zone: 'Europe/London',
          }).toFormat('cccc d LLLL');

          return (
            <Card margin="1rem 0 0">
              <Styled.CardContent>
                <Styled.Section>
                  <Styled.Header as="header">
                    <Styled.OrderId>
                      #{id.substring(id.length - 6, id.length)}
                    </Styled.OrderId>
                    <div>
                      <span>£{totalOrderValue.toFixed(2)}</span>
                      {/* <span>
                    {totalContainerPrice ? (
                      <span> + £{+parseFloat(totalContainerPrice)}</span>
                    ) : null}
                  </span> */}
                    </div>
                  </Styled.Header>
                </Styled.Section>

                <Styled.Section>
                  <Styled.Row>
                    <Styled.Status>
                      {paid
                        ? 'Delivered'
                        : `Delivery between ${st} and ${et} on ${day}`}
                    </Styled.Status>
                  </Styled.Row>
                </Styled.Section>

                {orderItemsByProduct.map(orderItems => (
                  <UserOrdersProductOrderItems orderItems={orderItems} />
                ))}
              </Styled.CardContent>
            </Card>
          );
        },
      )}
    </>
  );
};
