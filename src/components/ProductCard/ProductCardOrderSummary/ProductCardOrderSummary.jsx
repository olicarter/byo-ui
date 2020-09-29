import React, { useEffect, useState } from 'react';

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
      <span>{/* {getQuantity({ orderItems, units: allUnits })} */}</span>
      <span>
        £
        {Math.round(
          orderItems.reduce(
            (prev, curr) =>
              prev +
              Number(curr.quantity) *
                Number(curr.productVariant.incrementPrice),
            0,
          ) * 100,
        ) / 100}
        {orderItemsWithRefundableContainers.length ? (
          <Styled.ContainersTotalPrice>
            {' '}
            + £{totalRefundableContainersPrice}
          </Styled.ContainersTotalPrice>
        ) : null}
      </span>
    </Styled.OrderSummary>
  );
};
