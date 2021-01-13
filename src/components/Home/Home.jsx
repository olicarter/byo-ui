import React from 'react';
import { useQuery } from '@apollo/client';

import { Markdown } from '@components/Markdown';

import { GET_ALL_SETTINGS } from './Home.gql';

export const Home = () => {
  const {
    data: { allSettings: [{ homeContent = '' } = {}] = [] } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return <Markdown>{homeContent}</Markdown>;
};
