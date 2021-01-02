import React from 'react';
import { useQuery } from '@apollo/client';
import { DateTime } from 'luxon';

import { GET_AUTHENTICATED_USER } from './UserOrders.gql';
import * as Styled from './UserOrders.styled';
import { Card } from '../Card';
import { UserOrdersProductOrderItems } from './UserOrdersProductOrderItems';

export const UserOrders = () => {
  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const { orders = [] } = authenticatedUser || {};
  const submittedOrders = orders
    .filter(({ submitted }) => submitted)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

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
              orderItems.reduce(
                (prev, curr) =>
                  prev +
                  Number(curr.quantity) *
                    Number(curr.productVariant.incrementPrice),
                0,
              ) * 100,
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
                      <span>£{totalOrderValue}</span>
                      <Styled.TotalContainerPrice>
                        {totalContainerPrice ? (
                          <span> + £{+parseFloat(totalContainerPrice)}</span>
                        ) : null}
                      </Styled.TotalContainerPrice>
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
