import React from 'react';
import { useFormContext } from 'react-hook-form';
import { print } from 'graphql';
import { parse } from 'postcode';

import { GET_POSTCODE } from './PostcodeInput.gql';
import * as Styled from './PostcodeInput.styled';

const { REACT_APP_KEYSTONE_GRAPHQL_URI } = process.env;

export const PostcodeInput = ({ autoFocus = false, name = 'postcode' }) => {
  const { register } = useFormContext();

  return (
    <Styled.PostcodeInput
      autoFocus={autoFocus}
      name={name}
      ref={register({
        required: 'Please enter your postcode',
        minLength: {
          value: 6,
          message: 'That postcode looks too short',
        },
        validate: async postcode => {
          /** @todo move to helper */
          const token = localStorage.getItem('byo.token');
          const res = await fetch(REACT_APP_KEYSTONE_GRAPHQL_URI, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: print(GET_POSTCODE),
              variables: { postcode: parse(postcode).outcode },
            }),
          });
          const {
            data: { _allPostcodesMeta: { count } = {} } = {},
          } = await res.json();
          return !!count;
        },
      })}
      type="text"
    />
  );
};
