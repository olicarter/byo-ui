import React from 'react';

import * as Styled from './ProductCard.styled';
import { AddToOrderButton } from '../AddToOrderButton';

export const ProductCard = ({
  product,
  product: { increments, name, price = 0, slug, unit },
}) => (
  <Styled.ProductCard className="Product">
    <Styled.AspectRatio>
      <Styled.Image src={`https://source.unsplash.com/300x200/?${name}`} />
    </Styled.AspectRatio>
    <Styled.Content>
      <Styled.Name to={`/products/${slug}`}>{name}</Styled.Name>
      <Styled.Price>
        £{Number(price).toFixed(2)}
        <span>
          {' '}
          /{unit.singular === 'item' ? '' : increments}
          {unit.singularAbbreviated}
        </span>
      </Styled.Price>
    </Styled.Content>
    <Styled.Buttons>
      <AddToOrderButton product={product} />
    </Styled.Buttons>
  </Styled.ProductCard>
);
