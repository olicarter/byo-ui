import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Icon from '@mdi/react';
import {
  mdiAlertOctagram,
  mdiBicycleBasket,
  mdiFormatListBulletedType,
  mdiLoading,
  mdiMapMarker,
  mdiOctagram,
} from '@mdi/js';

import { useTheme } from '../../contexts';
import { GET_PRODUCTS_BY_SLUG } from './Product.gql';
import * as Styled from './Product.styled';
import { Title } from '../Typography';

export const Product = () => {
  const { productSlug } = useParams();

  const {
    palette: { grey },
  } = useTheme();

  const {
    data: {
      allProducts: [
        {
          name: productName,
          allergenInfo,
          deliveryInfo,
          ingredients,
          origin,
          variants = [],
          tags = [],
        } = {},
      ] = [],
    } = {},
    loading: getProductsBySlugLoading,
  } = useQuery(GET_PRODUCTS_BY_SLUG, {
    variables: { slug: productSlug },
  });

  const defaultDeliveryInfo = (() => {
    if (
      variants.every(({ container }) => container && !!Number(container.price))
    )
      return 'Delivered in refundable containers';
    if (
      variants.every(({ container }) => container && !Number(container.price))
    )
      return 'Delivered in non-refundable containers';
    return 'Delivered in cotton bags';
  })();

  if (getProductsBySlugLoading)
    return <Icon color={grey} rotate={90} path={mdiLoading} size={5} spin />;

  return (
    <Styled.Product>
      <Title>{productName}</Title>
      <Styled.Section>
        <Styled.Icon path={mdiBicycleBasket} size="2rem" />
        <div>
          <Styled.SectionTitle>Delivery info</Styled.SectionTitle>
          <Styled.Info>{deliveryInfo || defaultDeliveryInfo}</Styled.Info>
        </div>
      </Styled.Section>
      {origin ? (
        <Styled.Section>
          <Styled.Icon path={mdiMapMarker} size="2rem" />
          <div>
            <Styled.SectionTitle>Origin</Styled.SectionTitle>
            <Styled.Info>{origin}</Styled.Info>
          </div>
        </Styled.Section>
      ) : null}
      {tags.length ? (
        <Styled.Section>
          <Styled.Icon path={mdiOctagram} size="2rem" />
          <div>
            <Styled.SectionTitle>Tags</Styled.SectionTitle>
            <Styled.Info>
              {tags.map(({ name }) => name.toLowerCase()).join(', ')}
            </Styled.Info>
          </div>
        </Styled.Section>
      ) : null}
      {ingredients ? (
        <Styled.Section>
          <Styled.Icon path={mdiFormatListBulletedType} size="2rem" />
          <div>
            <Styled.SectionTitle>Ingredients</Styled.SectionTitle>
            <Styled.Info>{ingredients}</Styled.Info>
          </div>
        </Styled.Section>
      ) : null}
      {allergenInfo ? (
        <Styled.Section>
          <Styled.Icon path={mdiAlertOctagram} size="2rem" />
          <div>
            <Styled.SectionTitle>Allergen info</Styled.SectionTitle>
            <Styled.Info>{allergenInfo}</Styled.Info>
          </div>
        </Styled.Section>
      ) : null}
    </Styled.Product>
  );
};
