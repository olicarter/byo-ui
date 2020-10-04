import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { GET_USERS_BY_NETLIFY_ID } from './UserAddressForm.gql';
import { useAuth } from '../../contexts';

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
      {address.map(({ id, streetName, flatNumber, postCode }) => (
        <>
          <p>{id}</p>
          <p>{streetName}</p>
          <p>{flatNumber}</p>
          <p>{postCode}</p>
        </>
      ))}
      <div>
        <form>
          <h3>Personal Datails</h3>
          <div>
            <label>Firstname</label>
            <input type="text"></input>
          </div>
          <div>
            <label>Lastname</label>
            <input type="text"></input>
          </div>
          <div>
            <label>Email</label>
            <input type="text"></input>
          </div>
        </form>
      </div>
      <div>
        <form>
          <h3>Delivery Address</h3>
          <div>
            <label>Firstname</label>
            <input type="text"></input>
          </div>
          <div>
            <label>Lastname</label>
            <input type="text"></input>
          </div>
          <div>
            <label>Email</label>
            <input type="text"></input>
          </div>
          <div>
            <label>Mobile Number</label>
            <input type=""></input>
          </div>
          <div>
            <label>Street name</label>
            <input type="text"></input>
          </div>
          <div>
            <label>Apartment Number</label>
            <input type=""></input>
          </div>
        </form>
      </div>
    </div>
  );
};
