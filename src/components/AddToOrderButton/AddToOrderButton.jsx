import React, { useEffect } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  mdiBasketPlusOutline,
  mdiLoading,
  mdiMinusCircleOutline,
  mdiPlusCircleOutline,
} from '@mdi/js';

import { useAuth } from '../../contexts';
import { OrderItems } from '../../fragments';
import {
  CREATE_ORDER_ITEM,
  DELETE_ORDER_ITEM,
  GET_UNITS,
  GET_USER,
  UPDATE_ORDER_ITEM,
} from './AddToOrderButton.gql';
import * as Styled from './AddToOrderButton.styled';

const getQuantity = ({ increments, quantity, unit, units = [] }) => {
  const isItem = unit.singular === 'item';
  const quantityNeedsDividing = !isItem && quantity * increments >= 1000;
  const computedQuantity = quantityNeedsDividing
    ? (quantity * increments) / 1000
    : quantity * increments;
  let computedUnit = {};
  if (quantityNeedsDividing) {
    if (unit.singular === 'gram')
      computedUnit =
        units.find(({ singular }) => singular === 'kilogram') || {};
    if (unit.singular === 'millilitre')
      computedUnit = units.find(({ singular }) => singular === 'litre') || {};
  } else {
    computedUnit = unit;
  }
  return `${computedQuantity}${isItem ? ' ' : ''}${
    computedUnit[
      computedQuantity === 1 ? 'singularAbbreviated' : 'pluralAbbreviated'
    ]
  }`;
};

export const AddToOrderButton = ({
  product: { id: productId, increments, unit },
}) => {
  const { isAuthenticated, login, user: authUser } = useAuth();
  const { id: netlifyId } = authUser || {};

  const [getUser, { data: { allUsers } = {} }] = useLazyQuery(GET_USER, {
    variables: { netlifyId, productId },
  });

  useEffect(() => {
    if (netlifyId) getUser();
  }, [netlifyId, getUser]);

  const [{ id: userId, orders = [] } = {}] = allUsers || [];
  const unpaidOrder = orders.find(({ paid }) => !paid) || {};
  const { id: unpaidOrderId, orderItems = [] } = unpaidOrder;
  const { id: orderItemId, quantity } =
    orderItems.find(({ product: { id } }) => id === productId) || {};

  const { data: { allUnits } = {} } = useQuery(GET_UNITS);

  const [createOrderItem, { loading: createOrderItemLoading }] = useMutation(
    CREATE_ORDER_ITEM,
    {
      update: (cache, { data: { createOrderItem } }) => {
        const id = cache.identify(unpaidOrder);
        const { orderItems: currentOrderItems } = cache.readFragment({
          id,
          fragment: OrderItems,
          fragmentName: 'OrderItems',
        });
        cache.writeFragment({
          id,
          fragment: OrderItems,
          fragmentName: 'OrderItems',
          data: {
            orderItems: [...currentOrderItems, createOrderItem],
          },
        });
      },
    },
  );

  const [updateOrderItem] = useMutation(UPDATE_ORDER_ITEM);

  const [deleteOrderItem] = useMutation(DELETE_ORDER_ITEM, {
    update: (
      cache,
      {
        data: {
          deleteOrderItem: { id: deletedOrderItemId },
        },
      },
    ) => {
      const id = cache.identify(unpaidOrder);
      const { orderItems: currentOrderItems } = cache.readFragment({
        id,
        fragment: OrderItems,
        fragmentName: 'OrderItems',
      });
      cache.writeFragment({
        id,
        fragment: OrderItems,
        fragmentName: 'OrderItems',
        data: {
          orderItems: currentOrderItems.filter(
            ({ id: orderItemId }) => orderItemId !== deletedOrderItemId,
          ),
        },
      });
    },
  });

  const handleCreateOrderItem = () => {
    if (!isAuthenticated) return login();
    createOrderItem({
      variables: {
        data: {
          order: {
            ...(unpaidOrderId
              ? { connect: { id: unpaidOrderId } }
              : { create: { user: { connect: { id: userId } } } }),
          },
          product: { connect: { id: productId } },
          quantity: quantity || 1,
        },
      },
    });
  };

  const handleUpdateOrderItem = newQuantity => {
    if (!isAuthenticated) return login();
    updateOrderItem({ variables: { id: orderItemId, quantity: newQuantity } });
  };

  const handleDeleteOrderItem = () => {
    if (!isAuthenticated) return login();
    deleteOrderItem({ variables: { id: orderItemId } });
  };

  const increment = () => {
    if (!!quantity) handleUpdateOrderItem(quantity + 1);
    else handleCreateOrderItem();
  };

  const decrement = () => {
    if (quantity > 1) handleUpdateOrderItem(quantity - 1);
    else handleDeleteOrderItem();
  };

  if (createOrderItemLoading)
    return (
      <Styled.Buttons>
        <Styled.Quantity>
          <Styled.Icon
            path={mdiLoading}
            rotate={90}
            spin
            size={1}
            title="Loading"
          />
        </Styled.Quantity>
      </Styled.Buttons>
    );

  return (
    <Styled.Buttons>
      {quantity ? (
        <>
          <Styled.DecrementButton onClick={decrement}>
            <Styled.Icon
              path={mdiMinusCircleOutline}
              size={1}
              title="Decrement"
            />
          </Styled.DecrementButton>
          <Styled.Quantity>
            {getQuantity({ increments, quantity, unit, units: allUnits })}
          </Styled.Quantity>
          <Styled.IncrementButton onClick={increment}>
            <Styled.Icon
              path={mdiPlusCircleOutline}
              size={1}
              title="Increment"
            />
          </Styled.IncrementButton>
        </>
      ) : (
        <Styled.NewOrderItemButton onClick={increment}>
          <Styled.Icon path={mdiBasketPlusOutline} size={1} title="Increment" />
        </Styled.NewOrderItemButton>
      )}
    </Styled.Buttons>
  );
};
