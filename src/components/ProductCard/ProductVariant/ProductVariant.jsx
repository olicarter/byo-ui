import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { mdiLoading, mdiMinusCircle, mdiPlusCircle } from '@mdi/js';

import { useAuth } from '../../../contexts';
import { OrderItems, Orders } from '../../../fragments';
import {
  CREATE_ORDER_ITEM,
  DELETE_ORDER_ITEM,
  GET_USER,
  UPDATE_ORDER_ITEM,
} from './ProductVariant.gql';
import * as Styled from './ProductVariant.styled';

export const ProductVariant = ({
  variant: { id, container, increment, incrementPrice, tags = [], unit },
}) => {
  const { isAuthenticated, loginWithRedirect, user: authUser } = useAuth();
  const { sub: auth0Id } = authUser || {};

  const [incrementLoading, setIncrementLoading] = useState(false);
  const [decrementLoading, setDecrementLoading] = useState(false);

  const [getUser, { data: { allUsers } = {} }] = useLazyQuery(GET_USER, {
    variables: { auth0Id },
  });

  useEffect(() => {
    if (auth0Id) getUser();
  }, [auth0Id, getUser]);

  const [user] = allUsers || [];
  const { id: userId, orders = [] } = user || {};
  const unsubmittedOrder = orders.find(({ submitted }) => !submitted) || {};
  const { id: unsubmittedOrderId, orderItems = [] } = unsubmittedOrder;
  const { id: orderItemId, quantity } =
    orderItems.find(
      ({ productVariant: { id: variantId } }) => id === variantId,
    ) || {};

  const [createOrderItem] = useMutation(CREATE_ORDER_ITEM, {
    onCompleted: () => setIncrementLoading(false),
    update: (cache, { data: { createOrderItem } }) => {
      if (!unsubmittedOrderId) {
        const userCacheId = cache.identify(user);
        const { orders: currentOrders = [] } = cache.readFragment({
          id: userCacheId,
          fragment: Orders,
          fragmentName: 'Orders',
        });
        cache.writeFragment({
          id: userCacheId,
          fragment: Orders,
          fragmentName: 'Orders',
          data: {
            orders: [...currentOrders, createOrderItem.order],
          },
        });
      }
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
      const id = cache.identify(unsubmittedOrder);
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
    createOrderItem({
      variables: {
        data: {
          order: {
            ...(unsubmittedOrderId
              ? { connect: { id: unsubmittedOrderId } }
              : { create: { user: { connect: { id: userId } } } }),
          },
          productVariant: { connect: { id } },
          quantity: quantity || 1,
        },
      },
    });
  };

  const handleUpdateOrderItem = newQuantity => {
    updateOrderItem({ variables: { id: orderItemId, quantity: newQuantity } });
  };

  const handleDeleteOrderItem = () => {
    deleteOrderItem({ variables: { id: orderItemId } });
  };

  const incrementOrderItem = () => {
    if (!isAuthenticated)
      return loginWithRedirect({ redirectUri: window.location.href });
    setIncrementLoading(true);
    if (!!quantity) handleUpdateOrderItem(quantity + 1);
    else handleCreateOrderItem();
  };

  const decrementOrderItem = () => {
    if (!isAuthenticated)
      return loginWithRedirect({ redirectUri: window.location.href });
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
        {tags.length ? (
          <Styled.Tags>
            {tags.map(({ name }) => name.toLowerCase()).join(', ')}
          </Styled.Tags>
        ) : null}
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
