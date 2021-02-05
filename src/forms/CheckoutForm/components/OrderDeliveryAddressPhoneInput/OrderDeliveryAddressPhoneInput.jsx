import React, { useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useFormContext } from 'react-hook-form';

import { TextInput } from '@components/TextInput';

import {
  GET_ADDRESS_BY_ID,
  GET_AUTHENTICATED_USER,
} from './OrderDeliveryAddressPhoneInput.gql';

export const OrderDeliveryAddressPhoneInput = ({ name = 'phone' }) => {
  const { register, setValue, watch } = useFormContext();

  const addressId = watch('address');

  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);
  const { phone: userPhone } = authenticatedUser || {};

  const [
    getAddress,
    { data: { Address } = {} },
  ] = useLazyQuery(GET_ADDRESS_BY_ID, { variables: { id: addressId } });
  const { phone = userPhone } = Address || {};

  useEffect(() => {
    getAddress();
  }, [addressId, getAddress]);

  useEffect(() => {
    setValue(name, phone);
  }, [name, phone, setValue]);

  return (
    <TextInput
      name={name}
      ref={register({
        required: 'Phone number',
        minLength: {
          value: 11,
          message:
            'Please enter your full phone number, including area code if applicable',
        },
      })}
    />
  );
};
