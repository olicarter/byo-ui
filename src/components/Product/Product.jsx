import React from 'react';
import { useQuery } from '@apollo/client';

import { parseUnit } from '../../helpers';
import { GET_PRODUCT_QUERY } from './Product.gql';
import * as Styled from './Product.styled';
import { AddToOrderButton } from '../AddToOrderButton';

export const Product = ({ id }) => {
  const {
    data: { product: { increments, name, price = 0, slug, unit } = {} } = {},
  } = useQuery(GET_PRODUCT_QUERY, {
    variables: { id },
  });

  return (
    <Styled.Product className="Product">
      <Styled.Image src={`https://source.unsplash.com/300x200/?${name}`} />
      {/* <Styled.Header> */}
      <Styled.Name to={`/products/${slug}`}>{name}</Styled.Name>
      {/* </Styled.Header> */}
      <Styled.Price>
        £{price.toFixed(2)}
        <span>
          {' '}
          /{increments}
          {parseUnit(unit).abbreviated}
        </span>
      </Styled.Price>
      <AddToOrderButton />
    </Styled.Product>
  );
};
