import React from 'react';

import * as Styled from './Section.styled';

export const Section = ({
  children,
  margin = '1rem 0 0',
  padding = '0 1rem',
}) => (
  <Styled.Section margin={margin} padding={padding}>
    {children}
  </Styled.Section>
);
