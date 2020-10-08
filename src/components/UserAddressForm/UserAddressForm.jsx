import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import {
  GET_USERS_BY_NETLIFY_ID,
  UPDATE_ADREESS_BY_NETLIFY_ID,
} from './UserAddressForm.gql';
import { useAuth } from '../../contexts';
import * as Styled from './UserAddressForm.styled';
import { Label } from '../Label';
import { Button } from '../Button';

export const UserAddressForm = () => {
  const { user: authUser } = useAuth();
  const { id: netlifyId } = authUser || {};

  const [getAddress, { data: { allUsers } = {} }] = useLazyQuery(
    GET_USERS_BY_NETLIFY_ID,
    {
      variables: {
        netlifyId,
      },
    },
  );

  const [{ address } = {}] = allUsers || [];
  let {
    id,
    firstName: currentDeliveryFirstName = '',
    lastName: currentDeliveryLastName = '',
    phoneNumber: currentPhoneNumber = '',
    street: currentStreetName = '',
    flatNumber: currentFlatNumber = '',
    postCode: currentPostCode = '',
  } = address || {};

  useEffect(() => {
    if (netlifyId) getAddress();
  }, [netlifyId, getAddress]);

  let currentError = 'work please';

  const [updateAddress] = useMutation(UPDATE_ADREESS_BY_NETLIFY_ID);
  const [deliveryFirstName, setDeliveryFirstName] = useState('');
  const [deliveryLastName, setDeliveryLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [postCode, setPostCode] = useState('');
  let [, setError] = useState('');

  useEffect(() => {
    setDeliveryFirstName(currentDeliveryFirstName);
  }, [currentDeliveryFirstName]);

  useEffect(() => {
    setDeliveryLastName(currentDeliveryLastName);
  }, [currentDeliveryLastName]);

  useEffect(() => {
    setPhoneNumber(currentPhoneNumber);
  }, [currentPhoneNumber]);

  useEffect(() => {
    setStreetName(currentStreetName);
  }, [currentStreetName]);

  useEffect(() => {
    setFlatNumber(currentFlatNumber);
  }, [currentFlatNumber]);

  useEffect(() => {
    setPostCode(currentPostCode);
  }, [currentPostCode]);

  useEffect(() => {
    setError(currentError);
  }, [currentError]);

  console.log(currentError);
  const validateInputs = () => {
    if (deliveryFirstName < 2 || deliveryFirstName === '') {
      // need to be fixed to update state
      setError('Name cannot be empty');
    } else {
      handleSubmit();
    }
  };

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
    <div>
      <h3>There will be UserDetailsForm Compoonent right here!</h3>
      <p>{currentError}</p>
      <Styled.Form>
        <Styled.Heading>Delivery Address</Styled.Heading>
        <Styled.FormGroup>
          <Label>Firstname</Label>
          <Styled.TextInput
            name="firstname"
            type="text"
            value={deliveryFirstName}
            onChange={e => setDeliveryFirstName(e.target.value)}
          ></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Lastname</Label>
          <Styled.TextInput
            type="text"
            value={deliveryLastName}
            onChange={e => setDeliveryLastName(e.target.value)}
          ></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Mobile Number</Label>
          <Styled.TextInput
            type="text"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          ></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Street Name</Label>
          <Styled.TextInput
            type="text"
            value={streetName}
            onChange={e => setStreetName(e.target.value)}
          ></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Apartment Number</Label>
          <Styled.TextInput
            type="text"
            value={flatNumber}
            onChange={e => setFlatNumber(e.target.value)}
          ></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Post Code</Label>
          <Styled.TextInput
            type="text"
            value={postCode}
            onChange={e => setPostCode(e.target.value)}
          ></Styled.TextInput>
        </Styled.FormGroup>
      </Styled.Form>
      <Button onClick={validateInputs}>Update</Button>
    </div>
  );
};
