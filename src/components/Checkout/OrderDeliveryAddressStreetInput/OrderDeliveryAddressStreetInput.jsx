import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useFormContext } from 'react-hook-form';

import { GET_ADDRESS_BY_ID } from './OrderDeliveryAddressStreetInput.gql';
import { TextInput } from '../../TextInput';

export const OrderDeliveryAddressStreetInput = ({ name = 'street' }) => {
  const { register, setValue, watch } = useFormContext();

  const addressId = watch('address');

  const [
    getAddress,
    { data: { Address } = {} },
  ] = useLazyQuery(GET_ADDRESS_BY_ID, { variables: { id: addressId } });
  const { street = '' } = Address || {};

  useEffect(() => {
    getAddress();
  }, [addressId, getAddress]);

  useEffect(() => {
    setValue(name, street);
  }, [name, setValue, street]);

  return (
    <TextInput
      name={name}
      ref={register({
        required: 'Please enter a delivery address',
        minLength: {
          value: 3,
          message: 'Hm that address should probably be longer',
        },
      })}
    />
  );
};
