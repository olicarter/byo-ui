import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useFormContext } from 'react-hook-form';

import { TextInput } from '@components/TextInput';

import { GET_ADDRESS_BY_ID } from './OrderDeliveryAddressDeliveryInstructionsInput.gql';

export const OrderDeliveryAddressDeliveryInstructionsInput = ({
  name = 'deliveryInstructions',
}) => {
  const { register, setValue, watch } = useFormContext();

  const addressId = watch('address');

  const [
    getAddress,
    { data: { Address } = {} },
  ] = useLazyQuery(GET_ADDRESS_BY_ID, { variables: { id: addressId } });

  const { deliveryInstructions = '' } = Address || {};

  useEffect(() => {
    getAddress();
  }, [addressId, getAddress]);

  useEffect(() => {
    setValue(name, deliveryInstructions);
  }, [deliveryInstructions, name, setValue]);

  return <TextInput name={name} ref={register()} />;
};
