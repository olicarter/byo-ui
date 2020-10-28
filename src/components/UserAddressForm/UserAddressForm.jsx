import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import {
  GET_AUTHENTICATED_USER,
  CREATE_ADREESS_BY_NETLIFY_ID,
  SET_ORDER_ADDRESS,
} from './UserAddressForm.gql';
import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { TextInput } from '../TextInput';

export const UserAddressForm = () => {
  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const { address, firstName, lastName, orders = [] } = authenticatedUser || {};
  const { id: addressId } = ({} = address || {});
  let {
    id,
    phoneNumber: currentPhoneNumber,
    street: currentStreetName,
    flatNumber: currentFlatNumber,
    postCode: currentPostCode,
  } = address || {};

  let currentError = 'work please';
  const [createAddress] = useMutation(CREATE_ADREESS_BY_NETLIFY_ID);
  const [deliveryFirstName, setDeliveryFirstName] = useState('');
  const [deliveryLastName, setDeliveryLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [postCode, setPostCode] = useState('');
  const [isAddressChanged, setIsAddressChanged] = useState(false);

  useEffect(() => {
    if (!deliveryFirstName) setDeliveryFirstName(firstName);
    else if (firstName !== deliveryFirstName) setIsAddressChanged(true);
  }, [firstName, deliveryFirstName]);

  useEffect(() => {
    if (!deliveryLastName) setDeliveryLastName(lastName);
    else if (lastName !== deliveryLastName) setIsAddressChanged(true);
  }, [lastName, deliveryLastName]);

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
  const [setOrderAddress] = useMutation(SET_ORDER_ADDRESS);

  /* @todo  (if address is null.. create on order items checkout)*/

  const handleSubmit = () => {
    // logic need to be fixed when null
    if (address === null) {
      createAddress({
        variables: {
          firstName: deliveryFirstName,
          lastName: deliveryLastName,
          phoneNumber: phoneNumber,
          street: streetName,
          flatNumber: flatNumber,
          postCode: postCode,
        },
      });
      setOrderAddress({
        variables: { id: unsubmittedOrderId, addressId: addressId },
      });
    } else {
      setOrderAddress({
        variables: { id: unsubmittedOrderId, addressId: addressId },
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
        <FormGroup label="First name" margin="0">
          <TextInput
            onChange={setDeliveryFirstName}
            value={deliveryFirstName}
          />
        </FormGroup>
        <FormGroup label="Last name" margin="0">
          <TextInput onChange={setDeliveryLastName} value={deliveryLastName} />
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
        <Button borderRadius onClick={handleSubmit}>
          Update address
        </Button>
      </FormGroup>
    </FormGroup>
  );
};
