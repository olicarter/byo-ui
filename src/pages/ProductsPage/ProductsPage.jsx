import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { parse, stringify } from 'qs';

import { CategoryBar } from '@components/CategoryBar';
import { Products } from '@components/Products';
import { Section } from '@components/Section';
import { SearchBar } from '@components/SearchBar';
import { TagBar } from '@components/TagBar';

export const ProductsPage = () => {
  const { search } = useLocation();

  const { category } = parse(search, {
    ignoreQueryPrefix: true,
  });

  if (!category) {
    return (
      <Redirect
        to={{
          pathname: '/products',
          search: stringify(
            { category: 'baking' },
            {
              arrayFormat: 'brackets',
              encode: false,
            },
          ),
        }}
      />
    );
  }

  return (
    <>
      <Section>
        <SearchBar />
        <CategoryBar />
        <TagBar />
      </Section>

      <Section>
        <Products />
      </Section>
    </>
  );
};
