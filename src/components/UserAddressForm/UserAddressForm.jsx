import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import {
  GET_AUTHENTICATED_USER,
  SET_ORDER_ADDRESS,
  UPDATE_ORDER_ADDRESS,
} from './UserAddressForm.gql';
import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { TextInput } from '../TextInput';

export const UserAddressForm = () => {
  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const { address, orders = [] } = authenticatedUser || {};
  const [{ id: addressId } = {}] = address || [];
  let {
    name: currentName,
    phoneNumber: currentPhoneNumber,
    street: currentStreetName,
    flatNumber: currentFlatNumber,
    postCode: currentPostCode,
  } = address || {};

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [postCode, setPostCode] = useState('');
  const [isAddressChanged, setIsAddressChanged] = useState(false);

  const [updateOrderAddress] = useMutation(UPDATE_ORDER_ADDRESS);
  const [setOrderAddress] = useMutation(SET_ORDER_ADDRESS);

  useEffect(() => {
    if (!name) setName(currentName);
    else if (name !== currentName) setIsAddressChanged(true);
  }, [name, currentName]);

  useEffect(() => {
    if (!phoneNumber) setPhoneNumber(currentPhoneNumber);
    else if (phoneNumber !== currentPhoneNumber) setIsAddressChanged(true);
  }, [currentPhoneNumber]);

  useEffect(() => {
    if (!streetName) setStreetName(currentStreetName);
    else if (streetName !== currentStreetName) setIsAddressChanged(true);
  }, [currentStreetName]);

  useEffect(() => {
    if (!flatNumber) setFlatNumber(currentFlatNumber);
    else if (flatNumber !== currentFlatNumber) setIsAddressChanged(true);
  }, [currentFlatNumber]);

  useEffect(() => {
    if (!postCode) setPostCode(currentPostCode);
    else if (postCode !== currentPostCode) setIsAddressChanged(true);
  }, [currentPostCode]);

  const { id: unsubmittedOrderId } =
    orders.find(({ submitted }) => !submitted) || {};

  const handleSubmit = () => {
    if (address === null) {
      updateOrderAddress({
        variables: {
          id: unsubmittedOrderId,
          name,
          phoneNumber,
          street: streetName,
          flatNumber,
          postCode,
        },
      });
    } else {
      setOrderAddress({
        variables: { id: unsubmittedOrderId, addressId },
      });
    }
  };

  return (
    <FormGroup
      label="Delivery address"
      largeLabel
      info="Enter the address you would like your order delivered to."
    >
      <FormGroup horizontal margin="0">
        <FormGroup label="Name" margin="0">
          <TextInput onChange={setName} value={name} />
        </FormGroup>
      </FormGroup>
      <FormGroup horizontal>
        <FormGroup label="Flat #" flex={1} margin="0">
          <TextInput onChange={setFlatNumber} value={flatNumber} />
        </FormGroup>
        <FormGroup label="Street name" flex={1} margin="0">
          <TextInput onChange={setStreetName} value={streetName} />
        </FormGroup>
      </FormGroup>
      <FormGroup horizontal>
        <FormGroup label="Post code" flex={1} margin="0">
          <TextInput onChange={setPostCode} value={postCode} />
        </FormGroup>
        <FormGroup label="Mobile number" flex={1} margin="0">
          <TextInput onChange={setPhoneNumber} value={phoneNumber} />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        {isAddressChanged ? (
          <FormGroup>
            <Button borderRadius onClick={handleSubmit}>
              Update address
            </Button>
          </FormGroup>
        ) : null}
      </FormGroup>
    </FormGroup>
  );
};
