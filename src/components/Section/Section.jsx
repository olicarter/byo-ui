import React from 'react';

import * as Styled from './Section.styled';

export const Section = ({ children, padding = '0 1rem' }) => (
  <Styled.Section padding={padding}>{children}</Styled.Section>
);
