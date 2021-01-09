import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { NetworkStatus, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';

import { config } from '@config';
import { useAuth } from '@contexts';
import { CalloutSection } from '@components/CalloutSection';
import { Footer } from '@components/Footer';
import { ProtectedRoute } from '@components/ProtectedRoute';
import { TopBar } from '@components/TopBar';
import { LoadingPage } from '@pages';

import { GET_AUTHENTICATED_USER, GET_SETTINGS } from './App.gql';
import * as Styled from './App.styled';

const { pages } = config;

export const App = () => {
  const { isAuthenticated } = useAuth();

  const {
    loading: getSettingsLoading,
    networkStatus: getSettingsNetworkStatus,
    refetch: getSettingsRefetch,
  } = useQuery(GET_SETTINGS);

  const {
    loading: getAuthenticatedUserLoading,
    networkStatus: getAuthenticatedUserNetworkStatus,
    refetch: getAuthenticatedUserRefetch,
  } = useQuery(GET_AUTHENTICATED_USER, { notifyOnNetworkStatusChange: true });

  useEffect(() => {
    getSettingsRefetch();
    getAuthenticatedUserRefetch();
  }, [getAuthenticatedUserRefetch, getSettingsRefetch, isAuthenticated]);

  if (
    getSettingsLoading ||
    getAuthenticatedUserLoading ||
    getAuthenticatedUserNetworkStatus === NetworkStatus.refetch ||
    getSettingsNetworkStatus === NetworkStatus.refetch
  )
    return <LoadingPage />;

  return (
    <>
      <Helmet>
        <title>BYO</title>
      </Helmet>

      <Styled.Center>
        <Styled.App>
          <TopBar />

          <CalloutSection />

          <Styled.Main>
            {Object.keys(pages).map(key => {
              const { component, exact, path, private: isPrivate } = pages[key];
              const Tag = isPrivate ? ProtectedRoute : Route;

              return (
                <Tag exact={exact} key={key} path={path}>
                  {component}
                </Tag>
              );
            })}
          </Styled.Main>

          <Footer />
        </Styled.App>
      </Styled.Center>
    </>
  );
};
