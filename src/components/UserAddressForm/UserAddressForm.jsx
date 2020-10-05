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
      variables: { netlifyId },
    },
  );

  const [{ address = [] } = {}] = allUsers || [];
  const [{ user = [] } = {}] = allUsers || [];

  useEffect(() => {
    if (netlifyId) getAddress();
  }, [netlifyId, getAddress]);

  const [updateAddress] = useMutation(UPDATE_ADREESS_BY_NETLIFY_ID);

  const [flatNumber, setflatNumber] = useState('');
  const [streetName, setstreetName] = useState('');
  const [postCode, setpostCode] = useState('');

  debugger;
  return (
    <div>
      <Styled.Form>
        <Styled.Heading>Personal Datails</Styled.Heading>
        <Styled.FormGroup>
          <Label>Firstname</Label>
          <Styled.TextInput
            type="text"
            value={user.firstName}
          ></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Lastname</Label>
          <Styled.TextInput type="text"></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Email</Label>
          <Styled.TextInput type="text"></Styled.TextInput>
        </Styled.FormGroup>
      </Styled.Form>
      <Styled.Form>
        <Styled.Heading>Delivery Address</Styled.Heading>
        <Styled.FormGroup>
          <Label>Firstname</Label>
          <Styled.TextInput type="text"></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Lastname</Label>
          <Styled.TextInput type="text"></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Email</Label>
          <Styled.TextInput type="text"></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Mobile Number</Label>
          <Styled.TextInput type="number"></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Street Name</Label>
          <Styled.TextInput
            type="text"
            defaultValue={address.streetName}
          ></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Apartment Number</Label>
          <Styled.TextInput
            type="text"
            defaultValue={address.flatNumber}
          ></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Post Code</Label>
          <Styled.TextInput
            type="text"
            defaultValue={address.postCode}
          ></Styled.TextInput>
        </Styled.FormGroup>
      </Styled.Form>
      <Button>Update</Button>
    </div>
  );
};
