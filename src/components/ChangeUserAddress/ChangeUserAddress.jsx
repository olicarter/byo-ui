import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import {
  GET_AUTHENTICATED_USER,
  UPDATE_ADREESS_BY_NETLIFY_ID,
} from './ChangeUserAddress.gql';
import { FormGroup } from '../FormGroup';
import { TextInput } from '../TextInput';
import { Button } from '../Button';

export const ChangeUserAddress = () => {
  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const { address } = authenticatedUser || {};

  let {
    id,
    firstName: currentFirstName,
    lastName: currentLastName,
    phoneNumber: currentPhoneNumber,
    street: currentStreetName,
    flatNumber: currentFlatNumber,
    postCode: currentPostCode,
  } = address || {};

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [postCode, setPostCode] = useState('');
  const [isAddressChanged, setIsAddressChanged] = useState(false);

  useEffect(() => {
    if (!firstName) setFirstName(currentFirstName);
    else if (firstName !== currentFirstName) setIsAddressChanged(true);
  }, [firstName, currentFirstName]);

  useEffect(() => {
    if (!lastName) setLastName(currentLastName);
    else if (lastName !== currentLastName) setIsAddressChanged(true);
  }, [lastName, currentLastName]);

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

  const [updateAddress] = useMutation(UPDATE_ADREESS_BY_NETLIFY_ID);
  const handleSubmit = () => {
    updateAddress({
      variables: {
        id,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        street: streetName,
        flatNumber: flatNumber,
        postCode: postCode,
      },
    });
  };

  return (
    <FormGroup
      label="Home address"
      largeLabel
      info="Update home address if need be."
    >
      <FormGroup horizontal margin="0">
        <FormGroup label="First name" margin="0">
          <TextInput value={firstName} onChange={setFirstName} />
        </FormGroup>
        <FormGroup label="Last name" margin="0">
          <TextInput value={lastName} onChange={setLastName} />
        </FormGroup>
      </FormGroup>
      <FormGroup horizontal>
        <FormGroup label="Flat #" flex={1} margin="0">
          <TextInput value={flatNumber} onChange={setFlatNumber} />
        </FormGroup>
        <FormGroup label="Street name" flex={1} margin="0">
          <TextInput value={streetName} onChange={setStreetName} />
        </FormGroup>
      </FormGroup>
      <FormGroup horizontal>
        <FormGroup label="Post code" flex={1} margin="0">
          <TextInput value={postCode} onChange={setPostCode} />
        </FormGroup>
        <FormGroup label="Mobile number" flex={1} margin="0">
          <TextInput value={phoneNumber} onChange={setPhoneNumber} />
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
