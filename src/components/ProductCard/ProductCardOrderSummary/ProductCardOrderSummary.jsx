import React, { useEffect, useState } from 'react';

import { formatPrice, sumOrderItems } from '@helpers';

import * as Styled from './ProductCardOrderSummary.styled';

export const ProductCardOrderSummary = ({ orderItems }) => {
  const orderItemsWithRefundableContainers = orderItems.filter(
    ({ productVariant = {} }) => {
      if (productVariant === null) return false;
      const { container = {} } = productVariant;
      if (!container) return false;
      const { price } = container;
      return !!Number(price);
    },
  );

  const totalRefundableContainersPrice = orderItemsWithRefundableContainers.reduce(
    (prev, curr) =>
      prev + curr.quantity * Number(curr.productVariant.container.price),
    0,
  );

  // const { data: { allUnits } = {} } = useQuery(GET_UNITS);

  const [productVariantsVisible, setProductVariantsVisible] = useState(null);

  useEffect(() => {
    if (!!orderItems.length && productVariantsVisible === null)
      setProductVariantsVisible(true);
  }, [orderItems, productVariantsVisible]);

  return (
    <Styled.OrderSummary>
      <span>
        £{sumOrderItems(orderItems).products.toFixed(2)}
        {orderItemsWithRefundableContainers.length ? (
          <Styled.ContainersTotalPrice>
            {' '}
            + £{formatPrice(totalRefundableContainersPrice)}
          </Styled.ContainersTotalPrice>
        ) : null}{' '}
        in basket
      </span>
    </Styled.OrderSummary>
  );
};
