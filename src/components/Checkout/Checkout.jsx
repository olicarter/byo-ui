import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

import { useAuth } from '../../contexts';
import { sumOrderItems } from '../../helpers';
import {
  GET_SETTINGS,
  GET_USERS_BY_NETLIFY_ID,
  SUBMIT_ORDER,
} from './Checkout.gql';
import { BasketTotal } from '../BasketTotal';
import { DeliverySlotPicker } from '../DeliverySlotPicker';
import { FloatingButton } from '../FloatingButton';
import { FormGroup } from '../FormGroup';
import { Label } from '../Label';
import { DeliveryAddressForm } from '../DeliveryAddressForm';

export const Checkout = () => {
  const { push } = useHistory();
  const { user } = useAuth();
  const { id: netlifyId } = user || {};

  const {
    data: {
      allSettings: [
        { chooseDeliverySlotInfo, minOrderValue, orderSubmissionInfo } = {},
      ] = [],
    } = {},
  } = useQuery(GET_SETTINGS);

  const [getUser, { data: { allUsers } = {} }] = useLazyQuery(
    GET_USERS_BY_NETLIFY_ID,
    {
      variables: { netlifyId },
    },
  );

  useEffect(() => {
    if (netlifyId) getUser();
  }, [netlifyId, getUser]);

  const [{ orders = [] } = {}] = allUsers || [];
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

      <DeliveryAddressForm />

      {containersTotal > 0 ? (
        <div>
          <Label color="grey">£{productsTotal} goods</Label>
          <Label color="grey">£{containersTotal} refundable containers</Label>
        </div>
      ) : null}
      <FormGroup
        label={`£${total} total`}
        largeLabel
        info={total >= minOrderValue ? orderSubmissionInfo : undefined}
        errorInfo={
          productsTotal && containersTotal && total < minOrderValue
            ? `Minimum order value is £${minOrderValue}`
            : undefined
        }
      ></FormGroup>
      <FloatingButton
        disabled={total < minOrderValue || !deliverySlot}
        onClick={submitOrder}
      >
        Place order for <BasketTotal showCurrencySymbol />
      </FloatingButton>
    </>
  );
};
