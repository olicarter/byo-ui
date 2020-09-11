import React, { useState } from 'react';

import { parseUnit } from '../../helpers';
import * as Styled from './Product.styled';
import { AddToOrderButton } from '../AddToOrderButton';

export const Product = ({
  product: { id, increments, name, price = 0, slug, unit },
}) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <Styled.Product className="Product">
      <Styled.Image src={`https://source.unsplash.com/300x200/?${name}`} />
      <Styled.Name to={`/products/${slug}`}>{name}</Styled.Name>
      <Styled.Price>
        £{Number(price).toFixed(2)}
        <span>
          {' '}
          /{increments}
          {parseUnit(unit).abbreviated}
        </span>
      </Styled.Price>
      <AddToOrderButton productId={id} quantity={quantity} />
    </Styled.Product>
  );
};
