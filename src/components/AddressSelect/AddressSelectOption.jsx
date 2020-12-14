import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ADDRESS_BY_ID } from './AddressSelectOption.gql';

export const AddressSelectOption = ({ id }) => {
  const { data: { Address } = {} } = useQuery(GET_ADDRESS_BY_ID, {
    variables: { id },
  });

  const { street, name, postcode } = Address || {};

  return (
    <option value={id}>
      {name}, {street}, {postcode}
    </option>
  );
};
