import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useFormContext } from 'react-hook-form';

import { getUnsubmittedOrderFromUser } from '../../helpers';
import { GET_AUTHENTICATED_USER } from './AddressSelect.gql';
import * as Styled from './AddressSelect.styled';
import { AddressSelectOption } from './AddressSelectOption';
import { Select } from '../Select';

export const AddressSelect = ({ name = 'address' }) => {
  const { register, setValue } = useFormContext();

  const {
    data: { authenticatedUser } = {},
    loading: getAuthenticatedUserLoading,
  } = useQuery(GET_AUTHENTICATED_USER);

  const { addresses = [] } = authenticatedUser || {};
  const { address } = getUnsubmittedOrderFromUser(authenticatedUser);
  const { id: addressId } = address || {};

  useEffect(() => {
    setValue(name, addressId);
  }, [addressId]);

  return (
    <Styled.AddressSelectWrapper>
      <Select
        loading={(() => {
          if (getAuthenticatedUserLoading) return 'Loading addresses...';
          return undefined;
        })()}
        name={name}
        ref={register()}
      >
        <option value="">Enter a new address</option>

        {addresses.map(({ id }) => (
          <AddressSelectOption key={id} id={id} />
        ))}
      </Select>
    </Styled.AddressSelectWrapper>
  );
};
