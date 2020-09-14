import React from 'react';

import * as Styled from './Footer.styled';

export const Footer = () => (
  <Styled.Footer>
    <Styled.MadeWithText>
      made with <Styled.Heart>♥︎</Styled.Heart> by{' '}
      <Styled.Anchor href="https://github.com/olicarter" target="_blank">
        Oli
      </Styled.Anchor>{' '}
      and{' '}
      <Styled.Anchor href="https://github.com/tobzzy" target="_blank">
        Ola
      </Styled.Anchor>
    </Styled.MadeWithText>
  </Styled.Footer>
);
