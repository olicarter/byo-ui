import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { stringify, parse } from 'qs';
import { useMutation, useQuery } from '@apollo/client';
import { mdiMinusCircle, mdiPlusCircle } from '@mdi/js';

import { useAuth } from '@contexts';
import { OrderItems, Orders } from '@fragments';
import { formatPrice, getUnsubmittedOrderFromUser } from '@helpers';

import {
  CREATE_ORDER_ITEM,
  DECREMENT_ORDER_ITEM,
  DELETE_ORDER_ITEM,
  GET_AUTHENTICATED_USER,
  INCREMENT_ORDER_ITEM,
} from './ProductVariant.gql';
import * as Styled from './ProductVariant.styled';
import { ProductVariantTagList } from './ProductVariantTagList';

export const ProductVariant = ({
  productTags,
  variant: { id, container, increment, incrementPrice, name, tags, unit },
}) => {
  if (!unit) throw Error('Product variant unit not specified');

  const { push } = useHistory();
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAuth();

  const queryParams = parse(search, {
    ignoreQueryPrefix: true,
  });

  const {
    data: { authenticatedUser } = {},
    loading: getAuthenticatedUserLoading,
  } = useQuery(GET_AUTHENTICATED_USER);

  const { id: userId } = authenticatedUser || {};
  const unsubmittedOrder = getUnsubmittedOrderFromUser(authenticatedUser) || {};
  const { id: unsubmittedOrderId, orderItems = [] } = unsubmittedOrder;
  const { id: orderItemId, quantity } =
    orderItems.find(
      ({ productVariant: { id: variantId } }) => id === variantId,
    ) || {};

  const [createOrderItem, { loading: createOrderItemLoading }] = useMutation(
    CREATE_ORDER_ITEM,
    {
      update: (cache, { data: { createOrderItem } }) => {
        if (!unsubmittedOrderId) {
          const userCacheId = cache.identify(authenticatedUser);
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
    },
  );

  const [
    incrementOrderItem,
    { loading: incrementOrderItemLoading },
  ] = useMutation(INCREMENT_ORDER_ITEM, { variables: { id: orderItemId } });

  const [
    decrementOrderItem,
    { loading: decrementOrderItemLoading },
  ] = useMutation(DECREMENT_ORDER_ITEM, { variables: { id: orderItemId } });

  const [deleteOrderItem, { loading: deleteOrderItemLoading }] = useMutation(
    DELETE_ORDER_ITEM,
    {
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
    },
  );

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

  const handleDeleteOrderItem = () => {
    deleteOrderItem({ variables: { id: orderItemId } });
  };

  const redirectIfUnauthenticated = () => {
    if (!isAuthenticated) {
      return push({
        pathname: '/login',
        search: stringify(
          {
            ...queryParams,
            from: pathname,
          },
          { arrayFormat: 'brackets', encode: false },
        ),
      });
    }
  };

  const handleIncrementOrderItem = () => {
    redirectIfUnauthenticated();
    if (orderItemId) incrementOrderItem();
    else handleCreateOrderItem();
  };

  const handleDecrementOrderItem = () => {
    redirectIfUnauthenticated();
    if (orderItemId) {
      if (quantity > 1) decrementOrderItem();
      else handleDeleteOrderItem();
    }
  };

  return (
    <Styled.ProductVariant>
      <Styled.Info>
        <Styled.Quantity>{name}</Styled.Quantity>

        <Styled.Quantity quantity={quantity}>
          {quantity ? `${quantity} x ` : null}
          {`${increment}${
            increment > 1 ? unit.pluralAbbreviated : unit.singularAbbreviated
          } ${(() => {
            if (container) {
              if (!!Number(container.price)) return ` ${container.type}`;
              return ` ${container.type}`;
            }
            if (!['g', 'ml', 'kg', 'l'].includes(unit.singularAbbreviated))
              return '';
            return ' loose';
          })()}`}
        </Styled.Quantity>

        <Styled.Price>
          £{formatPrice(incrementPrice)}
          {container && Number(container.price) ? (
            <Styled.Container>
              {' '}
              + £{formatPrice(container.price)}
            </Styled.Container>
          ) : null}
        </Styled.Price>

        <ProductVariantTagList
          productTags={productTags}
          productVariantTags={tags}
        />
      </Styled.Info>

      <Styled.DecrementButton
        disabled={decrementOrderItemLoading || deleteOrderItemLoading}
        onClick={handleDecrementOrderItem}
        quantity={quantity}
      >
        <Styled.Icon path={mdiMinusCircle} size={0.8} title="Decrement" />
      </Styled.DecrementButton>

      <Styled.IncrementButton
        disabled={
          getAuthenticatedUserLoading ||
          createOrderItemLoading ||
          incrementOrderItemLoading
        }
        onClick={handleIncrementOrderItem}
      >
        <Styled.Icon path={mdiPlusCircle} size={0.8} title="Increment" />
      </Styled.IncrementButton>
    </Styled.ProductVariant>
  );
};
