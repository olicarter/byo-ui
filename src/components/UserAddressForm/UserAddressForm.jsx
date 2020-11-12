import React, { useEffect, useState } from 'react';
import { print } from 'graphql';
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';

import {
  GET_AUTHENTICATED_USER,
  GET_POSTCODE,
  // SET_ORDER_ADDRESS,
  UPDATE_ORDER_ADDRESS,
} from './UserAddressForm.gql';
import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { TextInput } from '../TextInput';

const { REACT_APP_KEYSTONE_GRAPHQL_URI } = process.env;

export const UserAddressForm = () => {
  const { handleSubmit, register, errors } = useForm();

  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const { address, orders = [] } = authenticatedUser || {};
  // const [{ id: addressId } = {}] = address || [];
  // let {
  //   name: currentName,
  //   phoneNumber: currentPhoneNumber,
  //   street: currentStreetName,
  //   flatNumber: currentFlatNumber,
  //   postCode: currentPostCode,
  // } = address || {};

  // const [name, setName] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [streetName, setStreetName] = useState('');
  // const [flatNumber, setFlatNumber] = useState('');
  // const [postCode, setPostCode] = useState('');
  // const [isAddressChanged, setIsAddressChanged] = useState(false);

  const [updateOrderAddress] = useMutation(UPDATE_ORDER_ADDRESS);
  // const [setOrderAddress] = useMutation(SET_ORDER_ADDRESS);

  // useEffect(() => {
  //   if (!name) setName(currentName);
  //   else if (name !== currentName) setIsAddressChanged(true);
  // }, [name, currentName]);

  // useEffect(() => {
  //   if (!phoneNumber) setPhoneNumber(currentPhoneNumber);
  //   else if (phoneNumber !== currentPhoneNumber) setIsAddressChanged(true);
  // }, [currentPhoneNumber]);

  // useEffect(() => {
  //   if (!streetName) setStreetName(currentStreetName);
  //   else if (streetName !== currentStreetName) setIsAddressChanged(true);
  // }, [currentStreetName]);

  // useEffect(() => {
  //   if (!flatNumber) setFlatNumber(currentFlatNumber);
  //   else if (flatNumber !== currentFlatNumber) setIsAddressChanged(true);
  // }, [currentFlatNumber]);

  // useEffect(() => {
  //   if (!postCode) setPostCode(currentPostCode);
  //   else if (postCode !== currentPostCode) setIsAddressChanged(true);
  // }, [currentPostCode]);

  const { id: unsubmittedOrderId } =
    orders.find(({ submitted }) => !submitted) || {};

  const onValid = ({ address, name, phone, postcode }) => {
    if (address === null) {
      updateOrderAddress({
        variables: {
          id: unsubmittedOrderId,
          address,
          name,
          phone,
          postcode,
        },
      });
    } else {
      // setOrderAddress({
      //   variables: { id: unsubmittedOrderId, addressId },
      // });
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <FormGroup
        label="Delivery address"
        largeLabel
        info="Enter the address you would like your order delivered to."
      >
        <FormGroup horizontal margin="0">
          <FormGroup
            label="Name"
            errorInfo={errors.name && errors.name.message}
            margin="0"
          >
            <TextInput
              name="name"
              ref={register({
                required: 'Name',
                minLength: {
                  value: 2,
                  message:
                    'Please enter the name of the person receiving the order',
                },
              })}
            />
          </FormGroup>
          <FormGroup
            label="Phone number"
            errorInfo={errors.phone && errors.phone.message}
            flex={1}
            margin="0"
          >
            <TextInput
              name="phone"
              ref={register({
                required: 'Phone number',
                minLength: {
                  value: 11,
                  message:
                    'Please enter your full phone number, including area code if applicable',
                },
              })}
            />
          </FormGroup>
        </FormGroup>
        <FormGroup horizontal>
          <FormGroup
            label="Address"
            errorInfo={errors.address && errors.address.message}
            flex={1}
            margin="0"
          >
            <TextInput
              name="address"
              ref={register({
                required: 'Address',
                minLength: {
                  value: 3,
                  message: 'Hm that address should probably be longer',
                },
              })}
            />
          </FormGroup>
          <FormGroup
            label="Post code"
            errorInfo={
              errors.postcode &&
              errors.postcode.type === 'validate' &&
              "Sorry, we don't deliver here yet"
            }
            flex={1}
            margin="0"
          >
            <TextInput
              name="postcode"
              ref={register({
                required: 'Postcode',
                minLength: {
                  value: 6,
                  message: 'That postcode is too short',
                },
                validate: async postcode => {
                  const token = localStorage.getItem('byo.token');
                  const res = await fetch(REACT_APP_KEYSTONE_GRAPHQL_URI, {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      query: print(GET_POSTCODE),
                      variables: { postcode },
                    }),
                  });
                  const {
                    data: { _allPostcodesMeta: { count } = {} } = {},
                  } = await res.json();
                  return !!count;
                },
              })}
            />
          </FormGroup>
        </FormGroup>
        <FormGroup
          label="Delivery instructions"
          info="Put any helpful delivery instructions here"
        >
          <TextInput name="deliveryInstructions" ref={register()} />
        </FormGroup>
        <FormGroup>
          <FormGroup>
            <Button borderRadius onClick={handleSubmit}>
              Update address
            </Button>
          </FormGroup>
        </FormGroup>
      </FormGroup>
    </form>
  );
};
