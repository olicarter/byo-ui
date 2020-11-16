import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { print } from 'graphql';
import { FormProvider, useForm } from 'react-hook-form';

import { sumOrderItems } from '../../helpers';
import {
  GET_AUTHENTICATED_USER,
  GET_POSTCODE,
  GET_SETTINGS,
  SUBMIT_ORDER,
  UPDATE_AUTHENTICATED_USER,
} from './Checkout.gql';
import { BasketTotal } from '../BasketTotal';
import { DeliverySlotPicker } from '../DeliverySlotPicker';
import { FloatingButton } from '../FloatingButton';
import { FormGroup } from '../FormGroup';
import { PostcodeInput } from '../PostcodeInput';
import { TextInput } from '../TextInput';

const { REACT_APP_KEYSTONE_GRAPHQL_URI } = process.env;

export const Checkout = () => {
  const { push } = useHistory();
  const formMethods = useForm({ reValidateMode: 'onSubmit' });
  const { errors, handleSubmit, register, setValue } = formMethods;

  const {
    data: {
      allSettings: [
        { chooseDeliverySlotInfo, minOrderValue, orderSubmissionInfo } = {},
      ] = [],
    } = {},
  } = useQuery(GET_SETTINGS);

  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const {
    address: userAddress,
    name: userName,
    orders = [],
    phone: userPhone,
  } = authenticatedUser || {};

  const { address, deliveryInstructions, name, phone, postcode } =
    userAddress || {};
  const { id: unsubmittedOrderId, orderItems = [] } =
    orders.find(({ submitted }) => !submitted) || {};

  useEffect(() => {
    setValue('address', address);
  }, [address]);

  useEffect(() => {
    setValue('deliveryInstructions', deliveryInstructions);
  }, [deliveryInstructions]);

  useEffect(() => {
    setValue('name', name || userName);
  }, [name, userName]);

  useEffect(() => {
    setValue('phone', phone || userPhone);
  }, [phone]);

  useEffect(() => {
    setValue('postcode', postcode);
  }, [postcode]);

  const [updateAuthenticatedUser] = useMutation(UPDATE_AUTHENTICATED_USER);

  const [submitOrder] = useMutation(SUBMIT_ORDER, {
    variables: { id: unsubmittedOrderId, submitted: true },
    onCompleted: ({ updateOrder }) => {
      const { address } = updateOrder || {};
      const { id: addressId } = address || {};
      updateAuthenticatedUser({ variables: { addressId } });
      push('/account');
    },
  });

  const onValid = async ({ address, name, phone, postcode }) => {
    /** @todo move to helper */
    const token = localStorage.getItem('byo.token');
    const res = await fetch(REACT_APP_KEYSTONE_GRAPHQL_URI, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: print(GET_POSTCODE),
        variables: {
          postcode: String(postcode).replace(/\s/g, '').toUpperCase(),
        },
      }),
    });
    const { data: { allPostcodes } = {} } = await res.json();
    const [{ id: postcodeId } = {}] = allPostcodes || [];
    submitOrder({
      variables: {
        id: unsubmittedOrderId,
        address,
        name,
        phone,
        postcodeId,
      },
    });
  };

  let { total } = sumOrderItems(orderItems);
  total = total.toFixed(2);

  console.log('errors', errors);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onValid)}>
        <FormGroup
          label="Choose a delivery slot"
          largeLabel
          info={chooseDeliverySlotInfo}
          errorInfo={errors.deliverySlot && errors.deliverySlot.message}
          margin="0"
        >
          <DeliverySlotPicker register={register} />
        </FormGroup>

        <FormGroup
          label="Delivery address"
          largeLabel
          info="Enter the address you would like your order delivered to."
        >
          <FormGroup horizontal margin="0">
            <FormGroup
              label="Name"
              errorInfo={errors.name && errors.name.message}
              margin="0"
            >
              <TextInput
                name="name"
                ref={register({
                  required: 'Name',
                  minLength: {
                    value: 2,
                    message:
                      'Please enter the name of the person receiving the order',
                  },
                })}
              />
            </FormGroup>
            <FormGroup
              label="Phone number"
              errorInfo={errors.phone && errors.phone.message}
              flex={1}
              margin="0"
            >
              <TextInput
                name="phone"
                ref={register({
                  required: 'Phone number',
                  minLength: {
                    value: 11,
                    message:
                      'Please enter your full phone number, including area code if applicable',
                  },
                })}
              />
            </FormGroup>
          </FormGroup>
          <FormGroup horizontal>
            <FormGroup
              label="Address"
              errorInfo={errors.address && errors.address.message}
              flex={1}
              margin="0"
            >
              <TextInput
                name="address"
                ref={register({
                  required: 'Please enter a delivery address',
                  minLength: {
                    value: 3,
                    message: 'Hm that address should probably be longer',
                  },
                })}
              />
            </FormGroup>
            <FormGroup
              label="Postcode"
              errorInfo={(() => {
                if (!errors.postcode) return null;
                if (errors.postcode.type === 'validate')
                  return "Sorry, we don't deliver here yet";
                return errors.postcode.message;
              })()}
              flex={1}
              margin="0"
            >
              <PostcodeInput register={register} />
            </FormGroup>
          </FormGroup>
          <FormGroup
            label="Delivery instructions"
            info="Put any helpful delivery instructions here"
          >
            <TextInput name="deliveryInstructions" ref={register()} />
          </FormGroup>
        </FormGroup>

        <FormGroup
          label={`£${total} total`}
          largeLabel
          info={total >= minOrderValue ? orderSubmissionInfo : undefined}
        ></FormGroup>

        <FloatingButton type="submit">
          Place order for <BasketTotal showCurrencySymbol />
        </FloatingButton>
      </form>
    </FormProvider>
  );
};
