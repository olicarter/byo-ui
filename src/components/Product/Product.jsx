import React from 'react';

import { parseUnit } from '../../helpers';
import * as Styled from './Product.styled';
import { AddToOrderButton } from '../AddToOrderButton';

export const Product = ({
  product,
  product: { increments, name, price = 0, slug, unit },
}) => (
  <Styled.Product className="Product">
    <Styled.AspectRatio>
      <Styled.Image src={`https://source.unsplash.com/300x200/?${name}`} />
    </Styled.AspectRatio>
    <Styled.Content>
      <Styled.Name to={`/products/${slug}`}>{name}</Styled.Name>
      <Styled.Price>
        £{Number(price).toFixed(2)}
        <span>
          {' '}
          /{increments}
          {parseUnit(unit).abbreviated}
        </span>
      </Styled.Price>
    </Styled.Content>
    <Styled.Buttons>
      <AddToOrderButton product={product} />
    </Styled.Buttons>
  </Styled.Product>
);
