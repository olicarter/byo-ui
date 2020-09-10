import React from 'react';
import { useMutation } from '@apollo/client';

import { useAuth } from '../../contexts';
import { CREATE_ORDER_ITEM } from './AddToOrderButton.gql';
import * as Styled from './AddToOrderButton.styled';

export const AddToOrderButton = ({ productId, quantity }) => {
  const { login, user } = useAuth();

  const { id: userId, unpaidOrderId } = user || {};

  const [createOrderItem] = useMutation(CREATE_ORDER_ITEM);

  const handleClick = () => {
    if (!userId) return login();
    const data = {
      order: {
        ...(unpaidOrderId
          ? { connect: { id: unpaidOrderId } }
          : { create: { user: { connect: userId } } }),
      },
      product: { connect: { id: productId } },
      quantity,
    };
    createOrderItem({ variables: { data } });
  };

  return (
    <Styled.AddToOrderButton onClick={handleClick}>
      Add to order
    </Styled.AddToOrderButton>
  );
};
