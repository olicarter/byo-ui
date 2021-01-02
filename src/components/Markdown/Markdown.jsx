import React from 'react';

import * as Styled from './Markdown.styled';
import { SubTitle, Title } from '../Typography';

export const Markdown = ({ children = '', overrides = {} }) => (
  <Styled.Markdown
    options={{
      overrides: {
        a: Styled.Anchor,
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
