import React from 'react';
import { print } from 'graphql';

import { GET_POSTCODE } from './PostcodeInput.gql';
import * as Styled from './PostcodeInput.styled';

const { REACT_APP_KEYSTONE_GRAPHQL_URI } = process.env;

export const PostcodeInput = ({ autoFocus = false, register }) => (
  <Styled.PostcodeInput
    autoFocus={autoFocus}
    name="postcode"
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
            variables: {
              postcode: String(postcode).replace(/\s/g, '').toUpperCase(),
            },
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
