import React, { createContext, useContext } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { useAuth } from '../AuthContext';

const { REACT_APP_KEYSTONE_GRAPHQL_URI } = process.env;

export const GQLContext = createContext({});

export const useGQL = () => useContext(GQLContext);

export const GQLProvider = ({ children }) => {
  const {
    user: { token: { access_token: accessToken } = {} } = {},
  } = useAuth();

  const client = new ApolloClient({
    uri: REACT_APP_KEYSTONE_GRAPHQL_URI,
    cache: new InMemoryCache(),
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  return (
    <GQLContext.Provider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </GQLContext.Provider>
  );
};
