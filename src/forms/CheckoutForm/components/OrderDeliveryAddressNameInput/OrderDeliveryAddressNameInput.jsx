import React, { useEffect } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useFormContext } from 'react-hook-form';

import { TextInput } from '@components/TextInput';

import {
  GET_ADDRESS_BY_ID,
  GET_AUTHENTICATED_USER,
} from './OrderDeliveryAddressNameInput.gql';

export const OrderDeliveryAddressNameInput = ({ name: inputName = 'name' }) => {
  const { register, setValue, watch } = useFormContext();

  const addressId = watch('address');

  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);
  const { name: userName } = authenticatedUser || {};

  const [
    getAddress,
    { data: { Address } = {} },
  ] = useLazyQuery(GET_ADDRESS_BY_ID, { variables: { id: addressId } });
  const { name = userName } = Address || {};

  useEffect(() => {
    getAddress();
  }, [addressId, getAddress]);

  useEffect(() => {
    setValue(inputName, name);
  }, [inputName, name, setValue]);

  return (
    <TextInput
      name={inputName}
      ref={register({
        required: 'Name',
        minLength: {
          value: 2,
          message: 'Please enter the name of the person receiving the order',
        },
      })}
    />
  );
};
