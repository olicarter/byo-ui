import React, { useState, useEffect } from 'react';
import { FormGroup } from '../FormGroup';
import { TextInput } from '../TextInput';
import { Button } from '../Button';
import { useAuth } from '../../contexts';

import { useLazyQuery, useMutation } from '@apollo/client';

import {
  GET_USERS_BY_NETLIFY_ID,
  UPDATE_ADREESS_BY_NETLIFY_ID,
} from './ChangeUserAddress.gql';

export const ChangeUserAddress = () => {
  const { user: authUser } = useAuth();
  const { sub: auth0Id } = authUser || {};

  const [getUsersByAuth0Id, { data: { allUsers } = {} }] = useLazyQuery(
    GET_USERS_BY_NETLIFY_ID,
    {
      variables: { auth0Id },
    },
  );
  useEffect(() => {
    if (auth0Id) getUsersByAuth0Id();
  }, [auth0Id, getUsersByAuth0Id]);

  const [{ address } = {}] = allUsers || [];

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
