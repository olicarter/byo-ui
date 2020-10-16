import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  mdiAlertOctagram,
  mdiFormatListBulletedType,
  mdiMapMarker,
  mdiOctagram,
} from '@mdi/js';

import { GET_PRODUCTS_BY_SLUG } from './Product.gql';
import * as Styled from './Product.styled';
import { Title, SubTitle } from '../Typography';

export const Product = () => {
  const { productSlug } = useParams();

  const {
    data: {
      allProducts: [
        {
          name: productName,
          allergenInfo,
          ingredients,
          origin,
          tags = [],
        } = {},
      ] = [],
    } = {},
  } = useQuery(GET_PRODUCTS_BY_SLUG, {
    variables: { slug: productSlug },
  });

  return (
    <Styled.Product>
      <Title>{productName}</Title>
      {origin ? (
        <Styled.Info>
          <Styled.Icon path={mdiMapMarker} size="2rem" />
          <span>{origin}</span>
        </Styled.Info>
      ) : null}
      {tags.length ? (
        <Styled.Info>
          <Styled.Icon path={mdiOctagram} size="2rem" />
          <span>{tags.map(({ name }) => name.toLowerCase()).join(', ')}</span>
        </Styled.Info>
      ) : null}
      {ingredients ? (
        <Styled.Info>
          <Styled.Icon path={mdiFormatListBulletedType} size="2rem" />
          <span>{ingredients}</span>
        </Styled.Info>
      ) : null}
      {allergenInfo ? (
        <Styled.Info>
          <Styled.Icon path={mdiAlertOctagram} size="2rem" />
          <span>{allergenInfo}</span>
        </Styled.Info>
      ) : null}
    </Styled.Product>
  );
};
