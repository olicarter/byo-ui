import React, { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import { useAuth } from '../../contexts';
import { getAbbreviatedUnit } from '../../helpers';
import {
  CREATE_ORDER_ITEM,
  DELETE_ORDER_ITEM,
  GET_USER,
  UPDATE_ORDER_ITEM,
} from './AddToOrderButton.gql';
import { GET_UNPAID_ORDER_ITEMS_COUNT } from '../BasketIcon';
import * as Styled from './AddToOrderButton.styled';

export const AddToOrderButton = ({
  product: { id: productId, increments, unit },
}) => {
  const { isAuthenticated, login, user: authUser } = useAuth();
  const { id: netlifyId } = authUser || {};

  const [
    getUser,
    { data: { allUsers } = {}, refetch: refetchGetUser },
  ] = useLazyQuery(GET_USER, {
    variables: { netlifyId, productId },
  });

  const user = Array.isArray(allUsers) ? allUsers[0] : {};
  const {
    id: userId,
    orders: [
      {
        id: unpaidOrderId,
        orderItems: [{ id: orderItemId, quantity } = {}] = [],
      } = {},
    ] = [],
  } = user;

  useEffect(() => {
    if (netlifyId) getUser();
  }, [netlifyId, getUser]);

  const [createOrderItem] = useMutation(CREATE_ORDER_ITEM, {
    /**
     * @todo would ideally specify cache update function to avoid
     * unecessary api calls but this is quick and simple for now
     */
    onCompleted: refetchGetUser,
    refetchQueries: [
      {
        query: GET_UNPAID_ORDER_ITEMS_COUNT,
        variables: { netlifyId },
      },
    ],
  });

  const [updateOrderItem] = useMutation(UPDATE_ORDER_ITEM, {
    /**
     * @todo would ideally specify cache update function to avoid
     * unecessary api calls but this is quick and simple for now
     */
    onCompleted: refetchGetUser,
  });

  const [deleteOrderItem] = useMutation(DELETE_ORDER_ITEM, {
    /**
     * @todo would ideally specify cache update function to avoid
     * unecessary api calls but this is quick and simple for now
     */
    onCompleted: refetchGetUser,
    refetchQueries: [
      {
        query: GET_UNPAID_ORDER_ITEMS_COUNT,
        variables: { netlifyId },
      },
    ],
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

  return (
    <Styled.Buttons>
      {!!quantity && (
        <>
          <Styled.DecrementButton onClick={decrement}>-</Styled.DecrementButton>
          <Styled.Text>
            {`${quantity * increments}${getAbbreviatedUnit(unit)}`} in basket
          </Styled.Text>
        </>
      )}
      {quantity ? (
        <Styled.IncrementButton onClick={increment}>
          {quantity ? '+' : 'Add to order'}
        </Styled.IncrementButton>
      ) : (
        <Styled.NewOrderItemButton onClick={increment}>
          Add to basket
        </Styled.NewOrderItemButton>
      )}
    </Styled.Buttons>
  );
};
