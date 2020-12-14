import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useFormContext } from 'react-hook-form';

import { GET_ADDRESS_BY_ID } from './OrderDeliveryAddressDeliveryInstructionsInput.gql';
import { TextInput } from '../../TextInput';

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
  }, [addressId]);

  useEffect(() => {
    setValue(name, deliveryInstructions);
  }, [deliveryInstructions]);

  return <TextInput name={name} ref={register()} />;
};
