import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { FormProvider, useForm } from 'react-hook-form';

import { AddressSelect } from '@components/AddressSelect';
import { BasketTotal } from '@components/BasketTotal';
import { DeliverySlotPicker } from '@components/DeliverySlotPicker';
import { FloatingButton } from '@components/FloatingButton';
import { FormGroup } from '@components/FormGroup';
import { getUnsubmittedOrderFromUser, sumOrderItems } from '@helpers';

import {
  GET_AUTHENTICATED_USER,
  GET_SETTINGS,
  SUBMIT_ORDER,
  UPDATE_AUTHENTICATED_USER,
} from './CheckoutForm.gql';
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

export const CheckoutForm = () => {
  const { push, replace } = useHistory();
  const formMethods = useForm({ mode: 'onChange', reValidateMode: 'onChange' });
  const { errors, handleSubmit, setValue, watch } = formMethods;

  const deliverySlot = watch(inputNames.deliverySlot);

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

  const [
    updateAuthenticatedUser,
    { loading: updateAuthenticatedUserLoading },
  ] = useMutation(UPDATE_AUTHENTICATED_USER, {
    onCompleted: () => push('/account'),
  });

  const [submitOrder, { loading: submitOrderLoading }] = useMutation(
    SUBMIT_ORDER,
    {
      variables: { id: unsubmittedOrderId, submitted: true },
      onCompleted: ({ updateOrder }) => {
        const { address } = updateOrder || {};
        const { id: addressId } = address || {};
        if (addressId) updateAuthenticatedUser({ variables: { addressId } });
        else push('/account');
      },
    },
  );

  const onValid = async ({
    [inputNames.address]: address,
    [inputNames.deliveryInstructions]: deliveryInstructions,
    [inputNames.name]: name,
    [inputNames.phone]: phone,
    [inputNames.postcode]: postcode,
    [inputNames.street]: street,
  }) => {
    submitOrder({
      variables: {
        id: unsubmittedOrderId,
        get address() {
          if (!deliverySlot || deliverySlot === 'collection') return null;
          if (address) {
            return { connect: { id: address } };
          } else {
            return {
              create: {
                deliveryInstructions,
                name,
                phone,
                postcode,
                street,
              },
            };
          }
        },
        deliverySlot:
          deliverySlot && deliverySlot !== 'collection'
            ? { connect: { id: deliverySlot } }
            : null,
      },
    });
  };

  let { total } = sumOrderItems(orderItems);
  total = total.toFixed(2);

  if (total < minOrderValue) {
    replace('/basket');
    return null;
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onValid)}>
        <FormGroup
          label="Collect from store or choose delivery slot"
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

        {deliverySlot && deliverySlot !== 'collection' ? (
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
                    errors[inputNames.street] &&
                    errors[inputNames.street].message
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
                  <OrderDeliveryAddressPostcodeInput
                    name={inputNames.postcode}
                  />
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
        ) : null}

        <FormGroup
          label={
            <span>
              <BasketTotal includeDeliveryCharge showCurrencySymbol /> total
            </span>
          }
          largeLabel
          info={total >= minOrderValue ? orderSubmissionInfo : undefined}
        ></FormGroup>

        <FloatingButton
          loading={submitOrderLoading || updateAuthenticatedUserLoading}
          type="submit"
        >
          Place order for{' '}
          <BasketTotal includeDeliveryCharge showCurrencySymbol />
        </FloatingButton>
      </form>
    </FormProvider>
  );
};
