import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { mdiLoading, mdiMinusCircle, mdiPlusCircle } from '@mdi/js';

import { useAuth } from '../../../contexts';
import { OrderItems } from '../../../fragments';
import {
  CREATE_ORDER_ITEM,
  DELETE_ORDER_ITEM,
  // GET_UNITS,
  GET_USER,
  UPDATE_ORDER_ITEM,
} from './ProductVariant.gql';
import * as Styled from './ProductVariant.styled';

export const ProductVariant = ({
  variant: { id, container, increment, incrementPrice, unit },
}) => {
  const { isAuthenticated, login, user: authUser } = useAuth();
  const { id: netlifyId } = authUser || {};

  const [incrementLoading, setIncrementLoading] = useState(false);
  const [decrementLoading, setDecrementLoading] = useState(false);

  const [getUser, { data: { allUsers } = {} }] = useLazyQuery(GET_USER, {
    variables: { netlifyId },
  });

  useEffect(() => {
    if (netlifyId) getUser();
  }, [netlifyId, getUser]);

  const [{ id: userId, orders = [] } = {}] = allUsers || [];
  const unpaidOrder = orders.find(({ paid }) => !paid) || {};
  const { id: unpaidOrderId, orderItems = [] } = unpaidOrder;
  const { id: orderItemId, quantity } =
    orderItems.find(
      ({ productVariant: { id: variantId } }) => id === variantId,
    ) || {};

  // const { data: { allUnits } = {} } = useQuery(GET_UNITS);

  const [createOrderItem] = useMutation(CREATE_ORDER_ITEM, {
    onCompleted: () => setIncrementLoading(false),
    update: (cache, { data: { createOrderItem } }) => {
      const id = cache.identify(unpaidOrder);
      const { orderItems: currentOrderItems = [] } = cache.readFragment({
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
  });

  const [updateOrderItem] = useMutation(UPDATE_ORDER_ITEM, {
    onCompleted: () => {
      setIncrementLoading(false);
      setDecrementLoading(false);
    },
  });

  const [deleteOrderItem] = useMutation(DELETE_ORDER_ITEM, {
    onCompleted: () => setDecrementLoading(false),
    update: (
      cache,
      {
        data: {
          deleteOrderItem: { id: deletedOrderItemId },
        },
      },
    ) => {
      const id = cache.identify(unpaidOrder);
      const { orderItems: currentOrderItems = [] } = cache.readFragment({
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
          productVariant: { connect: { id } },
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

  const incrementOrderItem = () => {
    setIncrementLoading(true);
    if (!!quantity) handleUpdateOrderItem(quantity + 1);
    else handleCreateOrderItem();
  };

  const decrementOrderItem = () => {
    if (!quantity) return;
    setDecrementLoading(true);
    if (quantity > 1) handleUpdateOrderItem(quantity - 1);
    else handleDeleteOrderItem();
  };

  const loadingIcon = (
    <Styled.Icon path={mdiLoading} rotate={90} spin size={1} title="Loading" />
  );

  return (
    <Styled.ProductVariant>
      <Styled.DecrementButton onClick={decrementOrderItem} quantity={quantity}>
        {decrementLoading ? (
          loadingIcon
        ) : (
          <Styled.Icon path={mdiMinusCircle} size={0.8} title="Decrement" />
        )}
      </Styled.DecrementButton>

      <Styled.Info>
        <Styled.Quantity quantity={quantity}>
          {quantity ? `${quantity} x ` : null}
          {`${increment}${unit.singularAbbreviated} ${(() => {
            if (container) {
              if (!!Number(container.price)) return ` + ${container.type}`;
              return ` ${container.type}`;
            }
            if (unit.singularAbbreviated === ' item') return '';
            return ' loose';
          })()}`}
        </Styled.Quantity>
        <Styled.Price>
          £{incrementPrice}
          {container && !!Number(container.price) ? (
            <Styled.Container> + £{container.price}</Styled.Container>
          ) : null}
        </Styled.Price>
      </Styled.Info>

      <Styled.IncrementButton onClick={incrementOrderItem}>
        {incrementLoading ? (
          loadingIcon
        ) : (
          <Styled.Icon path={mdiPlusCircle} size={0.8} title="Increment" />
        )}
      </Styled.IncrementButton>
    </Styled.ProductVariant>
  );
};