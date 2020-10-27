import React from 'react';
import MarkdownToJSX from 'markdown-to-jsx';

import * as Styled from './Markdown.styled';
import { SubTitle, Title } from '../Typography';

export const Markdown = ({ children = '' }) => (
  <MarkdownToJSX
    options={{
      overrides: {
        h1: Title,
        h2: SubTitle,
        img: Styled.Image,
      },
    }}
  >
    {children}
  </MarkdownToJSX>
);
