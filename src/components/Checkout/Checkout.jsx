import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { FormProvider, useForm } from 'react-hook-form';

import { getUnsubmittedOrderFromUser, sumOrderItems } from '@helpers';
import {
  GET_AUTHENTICATED_USER,
  GET_SETTINGS,
  SUBMIT_ORDER,
  UPDATE_AUTHENTICATED_USER,
} from './Checkout.gql';
import { AddressSelect } from '../AddressSelect';
import { BasketTotal } from '../BasketTotal';
import { DeliverySlotPicker } from '../DeliverySlotPicker';
import { FloatingButton } from '../FloatingButton';
import { FormGroup } from '../FormGroup';
import { OrderDeliveryAddressDeliveryInstructionsInput } from './OrderDeliveryAddressDeliveryInstructionsInput';
import { OrderDeliveryAddressNameInput } from './OrderDeliveryAddressNameInput';
import { OrderDeliveryAddressPhoneInput } from './OrderDeliveryAddressPhoneInput';
import { OrderDeliveryAddressStreetInput } from './OrderDeliveryAddressStreetInput';
import { OrderDeliveryAddressPostcodeInput } from './OrderDeliveryAddressPostcodeInput';

const inputNames = {
  address: 'address',
  deliveryInstructions: 'deliveryInstructions',
  deliverySlot: 'deliverySlot',
  name: 'name',
  phone: 'phone',
  postcode: 'postcode',
  street: 'street',
};

export const Checkout = () => {
  const { push, replace } = useHistory();
  const formMethods = useForm({ reValidateMode: 'onSubmit' });
  const { errors, handleSubmit, setValue, watch } = formMethods;

  const {
    data: {
      allSettings: [
        { chooseDeliverySlotInfo, minOrderValue, orderSubmissionInfo } = {},
      ] = [],
    } = {},
  } = useQuery(GET_SETTINGS);

  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const { phone: userPhone } = authenticatedUser || {};

  const {
    id: unsubmittedOrderId,
    orderItems = [],
  } = getUnsubmittedOrderFromUser(authenticatedUser);

  useEffect(() => {
    setValue(inputNames.phone, userPhone);
  }, [setValue, userPhone]);

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

  const onValid = async ({
    [inputNames.deliveryInstructions]: deliveryInstructions,
    [inputNames.name]: name,
    [inputNames.phone]: phone,
    [inputNames.postcode]: postcode,
    [inputNames.street]: street,
  }) => {
    submitOrder({
      variables: {
        id: unsubmittedOrderId,
        address: address
          ? { connect: { id: address } }
          : {
              create: {
                deliveryInstructions,
                name,
                phone,
                postcode,
                street,
              },
            },
      },
    });
  };

  let { total } = sumOrderItems(orderItems);
  total = total.toFixed(2);

  if (total < minOrderValue) {
    replace('/basket');
    return null;
  }

  const address = watch(inputNames.address);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onValid)}>
        <FormGroup
          label="Choose a delivery slot"
          largeLabel
          info={chooseDeliverySlotInfo}
          errorInfo={
            errors[inputNames.deliverySlot] &&
            errors[inputNames.deliverySlot].message
          }
          margin="0"
        >
          <DeliverySlotPicker name={inputNames.deliverySlot} />
        </FormGroup>

        <FormGroup
          label="Delivery address"
          largeLabel
          info="Enter the address you would like your order delivered to."
        >
          <FormGroup
            errorInfo={
              errors[inputNames.address] && errors[inputNames.address].message
            }
            margin="0"
          >
            <AddressSelect name={inputNames.address} />
          </FormGroup>

          <FormGroup>
            <FormGroup horizontal margin="0">
              <FormGroup
                label="Name"
                errorInfo={
                  errors[inputNames.name] && errors[inputNames.name].message
                }
                margin="0"
              >
                <OrderDeliveryAddressNameInput name={inputNames.name} />
              </FormGroup>

              <FormGroup
                label="Phone number"
                errorInfo={
                  errors[inputNames.phone] && errors[inputNames.phone].message
                }
                flex={1}
                margin="0"
              >
                <OrderDeliveryAddressPhoneInput name={inputNames.phone} />
              </FormGroup>
            </FormGroup>

            <FormGroup horizontal>
              <FormGroup
                label="Address"
                errorInfo={
                  errors[inputNames.street] && errors[inputNames.street].message
                }
                flex={1}
                margin="0"
              >
                <OrderDeliveryAddressStreetInput name="street" />
              </FormGroup>

              <FormGroup
                label="Postcode"
                errorInfo={(() => {
                  if (!errors[inputNames.postcode]) return null;
                  if (errors[inputNames.postcode].type === 'validate')
                    return "Sorry, we don't deliver here yet";
                  return errors[inputNames.postcode].message;
                })()}
                flex={1}
                margin="0"
              >
                <OrderDeliveryAddressPostcodeInput name={inputNames.postcode} />
              </FormGroup>
            </FormGroup>
          </FormGroup>

          <FormGroup
            label="Delivery instructions"
            info="Put any helpful delivery instructions here"
          >
            <OrderDeliveryAddressDeliveryInstructionsInput
              name={inputNames.deliveryInstructions}
            />
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
