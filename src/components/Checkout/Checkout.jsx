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
import { UserAddressForm } from '../UserAddressForm';

export const Checkout = () => {
  const { push } = useHistory();
  const { user } = useAuth();
  const { sub: auth0Id } = user || {};

  const {
    data: {
      allSettings: [
        { chooseDeliverySlotInfo, minOrderValue, orderSubmissionInfo } = {},
      ] = [],
    } = {},
  } = useQuery(GET_SETTINGS);

  const [getUsersByAuth0Id, { data: { allUsers } = {} }] = useLazyQuery(
    GET_USERS_BY_NETLIFY_ID,
    {
      variables: { auth0Id },
    },
  );

  useEffect(() => {
    if (auth0Id) getUsersByAuth0Id();
  }, [auth0Id, getUsersByAuth0Id]);

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

  if (total < minOrderValue) {
    push('/basket');
    return null;
  }

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
