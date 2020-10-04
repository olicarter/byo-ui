import React from 'react';
import { useQuery } from '@apollo/client';
import Markdown from 'markdown-to-jsx';

import { GET_ALL_SETTINGS } from './Home.gql';
import * as Styled from './Home.styled';
import { SubTitle, Title } from '../Typography';

export const Home = () => {
  const {
    data: { allSettings: [{ homeContent = '' } = {}] = [] } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return (
    <Styled.Home>
      <Styled.MaxWidth>
        <Markdown
          options={{
            overrides: {
              h1: Title,
              h2: SubTitle,
              img: Styled.Image,
            },
          }}
        >
          {homeContent}
        </Markdown>
      </Styled.MaxWidth>
    </Styled.Home>
  );
};
