import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_SETTINGS } from './Home.gql';
import { Markdown } from '../Markdown';

export const Home = () => {
  const {
    data: { allSettings: [{ homeContent = '' } = {}] = [] } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return <Markdown>{homeContent}</Markdown>;
};
