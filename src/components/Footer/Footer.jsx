import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_SETTINGS } from './Footer.gql';
import * as Styled from './Footer.styled';
import { Markdown } from '../Markdown';
import { Section } from '../Section';

export const Footer = () => {
  const {
    data: { allSettings: [{ footerContent = '' } = {}] = [] } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return (
    <Styled.Footer>
      <Section>
        <Markdown
          overrides={{
            a: { component: Styled.Anchor, props: { target: '_blank' } },
            p: Styled.Paragraph,
          }}
        >
          {footerContent}
        </Markdown>
      </Section>

      <Section>
        <Styled.Paragraph>
          Made with <Styled.Heart>♥︎</Styled.Heart> by{' '}
          <Styled.Anchor href="https://github.com/olicarter" target="_blank">
            Oli
          </Styled.Anchor>
        </Styled.Paragraph>
      </Section>
    </Styled.Footer>
  );
};
