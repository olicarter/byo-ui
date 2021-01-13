import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { FloatingButton } from '@components/FloatingButton';
import { Markdown } from '@components/Markdown';

import { GET_PRODUCTS_BY_SLUG } from './Product.gql';

export const Product = () => {
  const { goBack } = useHistory();
  const { productSlug } = useParams();

  const {
    data: {
      allProducts: [
        { allergenInfo, deliveryInfo, ingredients, origin, tags = [] } = {},
      ] = [],
    } = {},
    loading,
  } = useQuery(GET_PRODUCTS_BY_SLUG, {
    variables: { slug: productSlug },
  });

  return (
    <>
      {loading || (
        <Markdown>
          {`
## Allergen info
${allergenInfo || 'Unknown'}

## Delivery info
${deliveryInfo || 'Unknown'}

## Ingredients
${ingredients || 'Unknown'}

## Origin
${origin || 'Unknown'}

## Tags
${tags.map(({ name }) => name.toLowerCase()).join(', ')}
              `}
        </Markdown>
      )}

      <FloatingButton onClick={goBack}>Go back</FloatingButton>
    </>
  );
};
