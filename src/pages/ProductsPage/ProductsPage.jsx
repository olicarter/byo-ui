import React from 'react';

import { CategoryBar } from '@components/CategoryBar';
import { Products } from '@components/Products';
import { Section } from '@components/Section';
import { SearchBar } from '@components/SearchBar';
import { TagBar } from '@components/TagBar';

export const ProductsPage = () => (
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
