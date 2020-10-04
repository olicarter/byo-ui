import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { GET_USERS_BY_NETLIFY_ID } from './UserAddressForm.gql';
import { useAuth } from '../../contexts';
import * as Styled from './UserAddressForm.styled';
import { TextInput } from '../TextInput';
import { FormGroup } from '../FormGroup';
import { Label } from '../Label';

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

  useEffect(() => {
    if (netlifyId) getAddress();
  }, [netlifyId, getAddress]);
  debugger;
  return (
    <div>
      <p>{address.id}</p>
      <p>{address.streetName}</p>
      <p>{address.flatNumber}</p>
      <p>{address.postCode}</p>
      <Styled.Form>
        <Styled.Heading>Personal Datails</Styled.Heading>
        <FormGroup>
          <Label>Firstname</Label>
          <TextInput type="text"></TextInput>
        </FormGroup>
        <FormGroup>
          <Label>Lastname</Label>
          <TextInput type="text"></TextInput>
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <TextInput type="text"></TextInput>
        </FormGroup>
      </Styled.Form>
      <Styled.Form>
        <Styled.Heading>Delivery Address</Styled.Heading>
        <FormGroup>
          <Label>Firstname</Label>
          <TextInput type="text"></TextInput>
        </FormGroup>
        <FormGroup>
          <Label>Lastname</Label>
          <TextInput type="text"></TextInput>
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <TextInput type="text"></TextInput>
        </FormGroup>
        <FormGroup>
          <Label>Mobile Number</Label>
          <TextInput type="number"></TextInput>
        </FormGroup>
        <FormGroup>
          <Label>Street Name</Label>
          <TextInput type="text"></TextInput>
        </FormGroup>
        <FormGroup>
          <Label>Apartment Number</Label>
          <TextInput type="number"></TextInput>
        </FormGroup>
      </Styled.Form>
    </div>
  );
};
