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

  const [{ address, firstName, lastName, email } = {}] = allUsers || [];
  let {
    id,
    street: currentStreetName,
    flatNumber: currentFlatNumber = '',
    postCode: currentPostCode = '',
  } = address || {};

  useEffect(() => {
    if (netlifyId) getAddress();
  }, [netlifyId, getAddress]);

  const [updateAddress] = useMutation(UPDATE_ADREESS_BY_NETLIFY_ID);

  const [streetName, setStreetName] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [postCode, setPostCode] = useState('');

  useEffect(() => {
    setStreetName(currentStreetName);
  }, [currentStreetName]);

  useEffect(() => {
    setFlatNumber(currentFlatNumber);
  }, [currentFlatNumber]);

  useEffect(() => {
    setPostCode(currentPostCode);
  }, [currentPostCode]);

  return (
    <div>
      <Styled.Form>
        <Styled.Heading>Personal Datails</Styled.Heading>
        <Styled.FormGroup>
          <Label>Firstname</Label>
          <Styled.TextInput type="text" value={firstName}></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Lastname</Label>
          <Styled.TextInput type="text" value={lastName}></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Email</Label>
          <Styled.TextInput type="text" defaultValue={email}></Styled.TextInput>
        </Styled.FormGroup>
      </Styled.Form>
      <Styled.Form>
        <Styled.Heading>Delivery Address</Styled.Heading>
        <Styled.FormGroup>
          <Label>Firstname</Label>
          <Styled.TextInput type="text" value={firstName}></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Lastname</Label>
          <Styled.TextInput type="text" value={lastName}></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Email</Label>
          <Styled.TextInput type="text" defaultValue={email}></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Mobile Number</Label>
          <Styled.TextInput type="number"></Styled.TextInput>
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
      <Button>Update</Button>
    </div>
  );
};
