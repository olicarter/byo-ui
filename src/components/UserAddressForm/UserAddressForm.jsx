import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import {
  GET_USERS_BY_NETLIFY_ID,
  UPDATE_ADREESS_BY_NETLIFY_ID,
} from './UserAddressForm.gql';
import { useAuth } from '../../contexts';
import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { TextInput } from '../TextInput';

export const UserAddressForm = () => {
  const { user: authUser } = useAuth();
  const { sub: auth0Id } = authUser || {};

  const [getUsersByAuth0Id, { data: { allUsers } = {} }] = useLazyQuery(
    GET_USERS_BY_NETLIFY_ID,
    {
      variables: { auth0Id },
    },
  );

  const [{ address, firstName, lastName } = {}] = allUsers || [];
  let {
    id,
    phoneNumber: currentPhoneNumber,
    street: currentStreetName,
    flatNumber: currentFlatNumber,
    postCode: currentPostCode,
  } = address || {};

  useEffect(() => {
    if (auth0Id) getUsersByAuth0Id();
  }, [auth0Id, getUsersByAuth0Id]);

  let currentError = 'work please';

  const [updateAddress] = useMutation(UPDATE_ADREESS_BY_NETLIFY_ID);
  const [deliveryFirstName, setDeliveryFirstName] = useState('');
  const [deliveryLastName, setDeliveryLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [postCode, setPostCode] = useState('');
  let [, setError] = useState('');
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

  useEffect(() => {
    setError(currentError);
  }, [currentError]);

  const handleSubmit = () => {
    updateAddress({
      variables: {
        id: id,
        firstName: deliveryFirstName,
        lastName: deliveryLastName,
        phoneNumber: phoneNumber,
        street: streetName,
        flatNumber: flatNumber,
        postCode: postCode,
      },
    });
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
      {isAddressChanged ? (
        <FormGroup>
          <Button borderRadius onClick={handleSubmit}>
            Update address
          </Button>
        </FormGroup>
      ) : null}
    </FormGroup>
  );
};
