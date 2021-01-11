import React from 'react';

import { Callout } from '@components/Callout';

import * as Styled from './Markdown.styled';
import { SubTitle, Title } from '../Typography';

export const Markdown = ({ children = '', overrides = {} }) => (
  <Styled.Markdown
    options={{
      overrides: {
        a: Styled.Anchor,
        Callout,
        h1: Title,
        h2: SubTitle,
        img: Styled.Image,
        p: Styled.Paragraph,
        ...overrides,
      },
    }}
  >
    {children}
  </Styled.Markdown>
);
