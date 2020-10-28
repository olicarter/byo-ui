import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { sumOrderItems } from '../../helpers';
import {
  GET_AUTHENTICATED_USER,
  GET_SETTINGS,
  SUBMIT_ORDER,
} from './Checkout.gql';
import { BasketTotal } from '../BasketTotal';
import { DeliverySlotPicker } from '../DeliverySlotPicker';
import { FloatingButton } from '../FloatingButton';
import { FormGroup } from '../FormGroup';
import { UserAddressForm } from '../UserAddressForm';

export const Checkout = () => {
  const { push } = useHistory();

  const {
    data: {
      allSettings: [
        { chooseDeliverySlotInfo, minOrderValue, orderSubmissionInfo } = {},
      ] = [],
    } = {},
  } = useQuery(GET_SETTINGS);

  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const { orders = [] } = authenticatedUser || {};
  const { id: unsubmittedOrderId, deliverySlot, orderItems = [] } =
    orders.find(({ submitted }) => !submitted) || {};

  const [submitOrder] = useMutation(SUBMIT_ORDER, {
    variables: { id: unsubmittedOrderId, submitted: true },
    onCompleted: () => push('/account'),
  });

  let { products, containers, total } = sumOrderItems(orderItems);
  const productsTotal = products.toFixed(2);
  const containersTotal = containers.toFixed(2);
  total = total.toFixed(2);

  // if (total < minOrderValue) {
  //   push('/basket');
  //   return null;
  // }

  return (
    <>
      <FormGroup
        label="Choose a delivery slot"
        largeLabel
        info={chooseDeliverySlotInfo}
        margin="0"
      >
        <DeliverySlotPicker />
      </FormGroup>

      <UserAddressForm />

      {/* {containersTotal > 0 ? (
        <div>
          <Label color="grey">£{productsTotal} goods</Label>
          <Label color="grey">£{containersTotal} refundable containers</Label>
        </div>
      ) : null} */}
      <FormGroup
        label={`£${total} total`}
        largeLabel
        info={total >= minOrderValue ? orderSubmissionInfo : undefined}
        // errorInfo={
        //   productsTotal && containersTotal && total < minOrderValue
        //     ? `Minimum order value is £${minOrderValue}`
        //     : undefined
        // }
      ></FormGroup>
      <FloatingButton disabled={!deliverySlot} onClick={submitOrder}>
        Place order for <BasketTotal showCurrencySymbol />
      </FloatingButton>
    </>
  );
};
