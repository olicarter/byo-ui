import React from 'react';

import * as Styled from './Markdown.styled';
import { SubTitle, Title } from '../Typography';

export const Markdown = ({ children = '' }) => (
  <Styled.Markdown
    options={{
      overrides: {
        h1: Title,
        h2: SubTitle,
        img: Styled.Image,
        p: Styled.Paragraph,
      },
    }}
  >
    {children}
  </Styled.Markdown>
);
