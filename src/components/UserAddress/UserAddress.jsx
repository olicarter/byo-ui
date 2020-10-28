import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  GET_USERS_BY_NETLIFY_ID,
  UPDATE_ADDRESS_BY_NETLIFY_ID,
} from './UserAddress.gql';
import { useAuth } from '../../contexts';
import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { TextInput } from '../TextInput';

export const UserAddress = () => {
  const { user: authUser } = useAuth();
  const { id: netlifyId } = authUser || {};

  const [getUsersByNetlifyId, { data: { allUsers } = {} }] = useLazyQuery(
    GET_USERS_BY_NETLIFY_ID,
    {
      variables: { netlifyId },
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

  const [updateAddress] = useMutation(UPDATE_ADDRESS_BY_NETLIFY_ID);

  //   const [isFirstNameChanged, setIsFirstNameChanged] = useState(false);
  //   const [isAddressLastNameChanged, setIsAddressLastNameChanged] = useState(
  //     false,
  //   );
  //   const [isPhoneNumberChanged, setIsPhoneNumberChanged] = useState(false);
  //   const [isStreetNameChanged, setIsStreetNameChanged] = useState(false);
  //   const [isFlatNumberChanged, setIsFlatNumberChanged] = useState(false);
  //   const [isPostCodeChanged, setIsPostCodeChanged] = useState(false);

  //   useEffect(() => {
  //     if (!deliveryFirstName) setDeliveryFirstName(firstName);
  //     else if (firstName !== deliveryFirstName) setIsFirstNameChanged(true);
  //   }, [firstName, deliveryFirstName]);

  //   useEffect(() => {
  //     if (!deliveryLastName) setDeliveryLastName(lastName);
  //     else if (lastName !== deliveryLastName) setIsAddressLastNameChanged(true);
  //   }, [lastName, deliveryLastName]);

  //   useEffect(() => {
  //     if (!phoneNumber) setPhoneNumber(currentPhoneNumber);
  //     else if (phoneNumber !== currentPhoneNumber) setIsPhoneNumberChanged(true);
  //   }, [currentPhoneNumber]);

  //   useEffect(() => {
  //     if (!streetName) setStreetName(currentStreetName);
  //     else if (streetName !== currentStreetName) setIsStreetNameChanged(true);
  //   }, [currentStreetName]);

  //   useEffect(() => {
  //     if (!flatNumber) setFlatNumber(currentFlatNumber);
  //     else if (flatNumber !== currentFlatNumber) setIsFlatNumberChanged(true);
  //   }, [currentFlatNumber]);

  //   useEffect(() => {
  //     if (!postCode) setPostCode(currentPostCode);
  //     else if (postCode !== currentPostCode) setIsPostCodeChanged(true);
  //   }, [currentPostCode]);

  //   useEffect(() => {
  //     if (netlifyId) getUsersByNetlifyId();
  //   }, [netlifyId, getUsersByNetlifyId]);

  return (
    <FormGroup label="Home address" largeLabel info="Update your home address">
      <FormGroup horizontal margin="0">
        <FormGroup label="First name" margin="0">
          <TextInput />
        </FormGroup>
        <FormGroup label="Last name" margin="0">
          <TextInput />
        </FormGroup>
      </FormGroup>
      <FormGroup horizontal>
        <FormGroup label="Flat #" flex={1} margin="0">
          <TextInput />
        </FormGroup>
        <FormGroup label="Street name" flex={2} margin="0">
          <TextInput />
        </FormGroup>
      </FormGroup>
      <FormGroup horizontal>
        <FormGroup label="Post code" flex={1} margin="0">
          <TextInput />
        </FormGroup>
        <FormGroup label="Mobile number" flex={2} margin="0">
          <TextInput />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Button>Update your address</Button>
      </FormGroup>
    </FormGroup>
  );
};
