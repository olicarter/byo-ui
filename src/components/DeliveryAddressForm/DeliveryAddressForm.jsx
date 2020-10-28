import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import {
  GET_USERS_BY_NETLIFY_ID,
  SET_ADDRESS_BY_NETLIFY_ID,
  SET_DELIVERY_ADREESS_BY_NETLIFY_ID,
} from './DeliveryAddressForm.gql';
import { useAuth } from '../../contexts';
import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { TextInput } from '../TextInput';

export const DeliveryAddressForm = () => {
  const { user: authUser } = useAuth();
  const { id: netlifyId } = authUser || {};

  const [getUsersByNetlifyId, { data: { allUsers } = {} }] = useLazyQuery(
    GET_USERS_BY_NETLIFY_ID,
    {
      variables: { netlifyId },
    },
  );
  const [{ address } = {}] = allUsers || [];

  useEffect(() => {
    if (netlifyId) getUsersByNetlifyId();
  }, [netlifyId, getUsersByNetlifyId]);

  const [createUserAddress] = useMutation(SET_ADDRESS_BY_NETLIFY_ID);
  const [createOrderAddress] = useMutation(SET_DELIVERY_ADREESS_BY_NETLIFY_ID);
  const [deliveryFirstName, setDeliveryFirstName] = useState('');
  const [deliveryLastName, setDeliveryLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [street, setStreet] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [postCode, setPostCode] = useState('');

  console.log('alluser', allUsers);
  const handleSubmit = () => {
    if (address === null) {
      createUserAddress({
        variables: {
          firstName: deliveryFirstName,
          lastName: deliveryLastName,
          phoneNumber: phoneNumber,
          street: street,
          flatNumber: flatNumber,
          postCode: postCode,
        },
      });
      createOrderAddress({
        variables: {
          firstName: deliveryFirstName,
          lastName: deliveryLastName,
          phoneNumber: phoneNumber,
          street: street,
          flatNumber: flatNumber,
          postCode: postCode,
        },
      });
    } else {
      createOrderAddress({
        variables: {
          firstName: deliveryFirstName,
          lastName: deliveryLastName,
          phoneNumber: phoneNumber,
          street: street,
          flatNumber: flatNumber,
          postCode: postCode,
        },
      });
    }
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
        <FormGroup label="Street name" flex={2} margin="0">
          <TextInput onChange={setStreet} value={street} />
        </FormGroup>
      </FormGroup>
      <FormGroup horizontal>
        <FormGroup label="Post code" flex={1} margin="0">
          <TextInput onChange={setPostCode} value={postCode} />
        </FormGroup>
        <FormGroup label="Mobile number" flex={2} margin="0">
          <TextInput onChange={setPhoneNumber} value={phoneNumber} required />
        </FormGroup>
      </FormGroup>
      <FormGroup>
        <Button borderRadius onClick={handleSubmit}>
          Update delivery address
        </Button>
      </FormGroup>
    </FormGroup>
  );
};
