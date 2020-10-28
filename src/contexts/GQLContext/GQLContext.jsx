import React, { createContext, useContext } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';

// import * as Styled from './GQLContext.styled';
import { useAuth } from '../AuthContext';

const { REACT_APP_KEYSTONE_GRAPHQL_URI } = process.env;

const { link, useApolloNetworkStatus } = createNetworkStatusNotifier();

// export const GlobalLoadingIndicator = () => {
//   const status = useApolloNetworkStatus();

//   return (
//     <Styled.GlobalLoadingIndicator loading={status.numPendingQueries > 0} />
//   );
// };

export const GQLContext = createContext({});

export const useGQL = () => useContext(GQLContext);

export const GQLProvider = ({ children }) => {
  const {
    user: { token: { access_token: accessToken } = {} } = {},
  } = useAuth();

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
    link: link.concat(
      createHttpLink({
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        uri: REACT_APP_KEYSTONE_GRAPHQL_URI,
      }),
    ),
  });

  return (
    <GQLContext.Provider value={{ useApolloNetworkStatus }}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </GQLContext.Provider>
  );
};
