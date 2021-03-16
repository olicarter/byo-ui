import React from 'react';

import { Callout } from '@components/Callout';
import { SubTitle, Title } from '@components/Typography';

import * as Styled from './Markdown.styled';

export const Markdown = ({ children = '', lines = 0, overrides = {} }) => (
  <Styled.Markdown
    lines={lines}
    options={{
      overrides: {
        a: Styled.Anchor,
        Callout,
        h1: Title,
        h2: SubTitle,
        img: props => (
          <Styled.ImageWrapper>
            <Styled.Image {...props} />
          </Styled.ImageWrapper>
        ),
        ol: Styled.OrderedList,
        p: Styled.Paragraph,
        ul: Styled.UnorderedList,
        ...overrides,
      },
    }}
  >
    {children}
  </Styled.Markdown>
);
