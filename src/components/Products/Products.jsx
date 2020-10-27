import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import { parse } from 'qs';

import { useAuth } from '../../contexts';
import { GET_PRODUCTS, GET_USERS_BY_NETLIFY_ID } from './Products.gql';
import { FloatingButton } from '../FloatingButton';
import { Grid } from '../Grid';
import { ProductCard } from '../ProductCard';

export const Products = () => {
  const { push } = useHistory();
  const { search } = useLocation();
  const { isAuthenticated, openLoginModal, user } = useAuth();
  const { id: netlifyId } = user || {};

  const { data: { allProducts = [] } = {} } = useQuery(GET_PRODUCTS);

  const [getUsersByNetlifyId] = useLazyQuery(GET_USERS_BY_NETLIFY_ID, {
    variables: { netlifyId },
  });

  useEffect(() => {
    if (netlifyId) getUsersByNetlifyId();
  }, [netlifyId, getUsersByNetlifyId]);

  const { category: queryCategorySlug, tags: queryTags = [] } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const filteredProducts = allProducts
    .filter(
      ({ category: { slug: categorySlug } = {}, tags = [] }) =>
        (!queryCategorySlug || queryCategorySlug === categorySlug) &&
        tags.some(({ slug: tagSlug }) =>
          queryTags.length ? queryTags.includes(tagSlug) : true,
        ),
    )
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <>
      <Grid>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
      {isAuthenticated ? (
        <FloatingButton onClick={() => push('/basket')}>
          View basket
        </FloatingButton>
      ) : (
        <FloatingButton onClick={openLoginModal}>Log in</FloatingButton>
      )}
    </>
  );
};
