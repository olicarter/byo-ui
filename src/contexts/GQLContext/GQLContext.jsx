import React, { createContext, useContext } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const { REACT_APP_KEYSTONE_GRAPHQL_URI } = process.env;

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('byo.token');
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

export const GQLContext = createContext({});

export const useGQL = () => useContext(GQLContext);

export const GQLProvider = ({ children }) => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
    link: authLink.concat(
      createHttpLink({ uri: REACT_APP_KEYSTONE_GRAPHQL_URI }),
    ),
  });

  return (
    <GQLContext.Provider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </GQLContext.Provider>
  );
};
