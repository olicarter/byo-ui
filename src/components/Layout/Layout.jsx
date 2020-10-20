import React from 'react';

import * as Styled from './Layout.styled';

export const Layout = ({ center = false, children }) => (
  <Styled.Layout center={center}>
    {center ? <Styled.MaxWidth>{children}</Styled.MaxWidth> : children}
  </Styled.Layout>
);
