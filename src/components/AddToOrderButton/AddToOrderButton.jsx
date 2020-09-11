import React, { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import { useAuth } from '../../contexts';
import { fragments, CREATE_ORDER_ITEM, GET_USER } from './AddToOrderButton.gql';
import * as Styled from './AddToOrderButton.styled';

export const AddToOrderButton = ({ productId, quantity }) => {
  const { isAuthenticated, login, user: authUser } = useAuth();
  const { id: netlifyId } = authUser || {};

  const [
    getUser,
    { data: { allUsers } = {}, refetch: refetchGetUser },
  ] = useLazyQuery(GET_USER, {
    variables: { netlifyId },
  });

  const user = Array.isArray(allUsers) ? allUsers[0] : {};
  const { id: userId, orders: [{ id: unpaidOrderId } = {}] = [] } = user;

  useEffect(() => {
    if (netlifyId) getUser();
  }, [netlifyId, getUser]);

  const [createOrderItem] = useMutation(CREATE_ORDER_ITEM, {
    /**
     * @todo would ideally specify cache update function to avoid
     * unecessary api calls but this is quick and simple for now
     */
    onCompleted: refetchGetUser,
  });

  const handleClick = () => {
    if (!isAuthenticated) return login();
    const data = {
      order: {
        ...(unpaidOrderId
          ? { connect: { id: unpaidOrderId } }
          : { create: { user: { connect: { id: userId } } } }),
      },
      product: { connect: { id: productId } },
      quantity: quantity || 1,
    };
    createOrderItem({ variables: { data } });
  };

  return (
    <Styled.AddToOrderButton onClick={handleClick}>
      Add to order
    </Styled.AddToOrderButton>
  );
};
