import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useFuzzy } from 'react-use-fuzzy';
import { FormGroup } from '../FormGroup';
import { TextInput } from '../TextInput';
import { Button } from '../Button';
import { ProductCard } from '../ProductCard';

import { GET_PRODUCTS } from './ProductSearch.gql';

export const ProductSearch = () => {
  const { data: { allProducts = [] } = {} } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState(allProducts);
  const { result, keyword, search } = useFuzzy(products, {
    keys: ['name'],
  });
  return (
    <FormGroup>
      <FormGroup label="Search for a product">
        <TextInput placeholder="Search products" value={keyword}></TextInput>
      </FormGroup>
      <FormGroup>
        <Button>Search</Button>
      </FormGroup>
    </FormGroup>
  );
};
