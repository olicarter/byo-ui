import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  mdiAlertOctagram,
  mdiBicycleBasket,
  mdiFormatListBulletedType,
  mdiMapMarker,
  mdiOctagram,
} from '@mdi/js';

import { GET_PRODUCTS_BY_SLUG } from './Product.gql';
import * as Styled from './Product.styled';
import { FloatingButton } from '@components/FloatingButton';
import { Title } from '@components/Typography';

export const Product = () => {
  const { goBack } = useHistory();
  const { productSlug } = useParams();

  const {
    data: {
      allProducts: [
        {
          name: productName,
          allergenInfo,
          deliveryInfo,
          ingredients,
          origin,
          tags = [],
        } = {},
      ] = [],
    } = {},
    loading,
  } = useQuery(GET_PRODUCTS_BY_SLUG, {
    variables: { slug: productSlug },
  });

  return (
    <>
      <Styled.Product>
        <Title>{loading ? 'Loading product info' : productName}</Title>
        {loading || (
          <>
            <Styled.Section>
              <Styled.Icon path={mdiBicycleBasket} size="2rem" />
              {deliveryInfo ? (
                <div>
                  <Styled.SectionTitle>Delivery info</Styled.SectionTitle>
                  <Styled.Info>{deliveryInfo}</Styled.Info>
                </div>
              ) : null}
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
          </>
        )}
        <FloatingButton onClick={goBack}>Go back</FloatingButton>
      </Styled.Product>
    </>
  );
};
