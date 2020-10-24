import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import {
  GET_USERS_BY_NETLIFY_ID,
  UPDATE_USER_BY_NETLIFY_ID,
} from './UserDetailsForm.gql';
import { Label } from '../Label';
import * as Styled from './UserDetailsForm.styled';
import { useAuth } from '../../contexts';
import { Button } from '../Button';

export const UserDetailsForm = () => {
  const { user: authUser } = useAuth();
  const { id: netlifyId } = authUser || {};

  const [getUser, { data: { allUsers } = {} }] = useLazyQuery(
    GET_USERS_BY_NETLIFY_ID,
    {
      variables: {
        netlifyId,
      },
    },
  );

  let [
    {
      id,
      firstName: currentFirstName = '',
      lastName: currentLastName = '',
      email: currentEmail = '',
    } = {},
  ] = allUsers || [];

  useEffect(() => {
    if (netlifyId) getUser();
  }, [netlifyId, getUser]);

  const [updateUser] = useMutation(UPDATE_USER_BY_NETLIFY_ID);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setFirstName(currentFirstName);
  }, [currentFirstName]);

  useEffect(() => {
    setLastName(currentLastName);
  }, [currentLastName]);

  useEffect(() => {
    setEmail(currentEmail);
  }, [currentEmail]);

  const handleSubmit = () => {
    updateUser({
      variables: {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
      },
    });
  };

  return (
    <div>
      <Styled.Form>
        <Styled.Heading>Personal Datails</Styled.Heading>
        <Styled.FormGroup>
          <Label>Firstname</Label>
          <Styled.TextInput
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          ></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Lastname</Label>
          <Styled.TextInput
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          ></Styled.TextInput>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Email</Label>
          <Styled.TextInput
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Styled.TextInput>
        </Styled.FormGroup>
      </Styled.Form>
      <Button onClick={handleSubmit}>Update</Button>
    </div>
  );
};
