import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FormGroup } from '../FormGroup';
import { TextInput } from '../TextInput';
import { useFuzzy } from 'react-use-fuzzy';

import { GET_PRODUCTS } from './ProductSearch.gql';

export const ProductSearch = () => {
  const { data: { allProducts = [] } = {} } = useQuery(GET_PRODUCTS);

  const [products] = useState(allProducts);
  const { result, keyword, search } = useFuzzy(products, {
    keys: ['name'],
  });

  return (
    <FormGroup>
      <FormGroup label="Search for a product">
        <TextInput
          placeholder="Enter product to search"
          value={keyword}
          onChange={search}
        />
      </FormGroup>
    </FormGroup>
  );
};
