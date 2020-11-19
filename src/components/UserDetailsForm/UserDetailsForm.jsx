import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import {
  GET_AUTHENTICATED_USER,
  UPDATE_USER_BY_NETLIFY_ID,
} from './UserDetailsForm.gql';
import { Label } from '../Label';
import * as Styled from './UserDetailsForm.styled';
import { Button } from '../Button';

export const UserDetailsForm = () => {
  const { data: { authenticatedUser } = {} } = useLazyQuery(
    GET_AUTHENTICATED_USER,
  );

  let { id, name: currentName = '', email: currentEmail = '' } =
    authenticatedUser || {};

  const [updateUser] = useMutation(UPDATE_USER_BY_NETLIFY_ID);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  useEffect(() => {
    setEmail(currentEmail);
  }, [currentEmail]);

  const handleSubmit = () => {
    updateUser({ variables: { id, name, email } });
  };

  return (
    <div>
      <Styled.Form>
        <Styled.Heading>Personal Datails</Styled.Heading>
        <Styled.FormGroup>
          <Label>Name</Label>
          <Styled.TextInput
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Label>Email</Label>
          <Styled.TextInput
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Styled.FormGroup>
      </Styled.Form>
      <Button onClick={handleSubmit}>Update</Button>
    </div>
  );
};
