import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_SETTINGS } from './About.gql';
import * as Styled from './About.styled';
import { Markdown } from '../Markdown';
import { SubTitle, Title } from '../Typography';

export const About = () => {
  const {
    data: { allSettings: [{ aboutContent = '' } = {}] = [] } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return (
    <Markdown
      options={{
        overrides: {
          h1: Title,
          h2: SubTitle,
          img: Styled.Image,
        },
      }}
    >
      {aboutContent}
    </Markdown>
  );
};
