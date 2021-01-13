import React from 'react';

import { Callout } from '@components/Callout';
import { SubTitle, Title } from '@components/Typography';

import * as Styled from './Markdown.styled';

export const Markdown = ({ children = '', overrides = {} }) => (
  <Styled.Markdown
    options={{
      overrides: {
        a: Styled.Anchor,
        Callout,
        h1: Title,
        h2: SubTitle,
        img: Styled.Image,
        ol: Styled.OrderedList,
        p: Styled.Paragraph,
        ...overrides,
      },
    }}
  >
    {children}
  </Styled.Markdown>
);
