import React, { createContext, useContext } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const { REACT_APP_KEYSTONE_GRAPHQL_URI } = process.env;

const client = new ApolloClient({
  uri: REACT_APP_KEYSTONE_GRAPHQL_URI,
  cache: new InMemoryCache(),
});

export const GQLContext = createContext({});

export const useGQL = () => useContext(GQLContext);

export const GQLProvider = ({ children }) => {
  return (
    <GQLContext.Provider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </GQLContext.Provider>
  );
};
