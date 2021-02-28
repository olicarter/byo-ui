import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { NetworkStatus, useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';

import { Callout } from '@components/Callout';
import { Footer } from '@components/Footer';
import { ProtectedRoute } from '@components/ProtectedRoute';
import { Section } from '@components/Section';
import { TopBar } from '@components/TopBar';
import { config } from '@config';
import { useApp, useAuth } from '@contexts';
import { LoadingPage, Page } from '@pages';

import { GET_AUTHENTICATED_USER, GET_PAGES, GET_SETTINGS } from './App.gql';
import * as Styled from './App.styled';

const { pages } = config;

export const App = () => {
  const { isAuthenticated } = useAuth();
  const { portalNodes } = useApp();

  const {
    loading: getSettingsLoading,
    networkStatus: getSettingsNetworkStatus,
    refetch: getSettingsRefetch,
  } = useQuery(GET_SETTINGS, { notifyOnNetworkStatusChange: true });

  const {
    loading: getPagesLoading,
    networkStatus: getPagesNetworkStatus,
    refetch: getPagesRefetch,
  } = useQuery(GET_PAGES, { notifyOnNetworkStatusChange: true });

  const {
    loading: getAuthenticatedUserLoading,
    networkStatus: getAuthenticatedUserNetworkStatus,
    refetch: getAuthenticatedUserRefetch,
  } = useQuery(GET_AUTHENTICATED_USER, { notifyOnNetworkStatusChange: true });

  useEffect(() => {
    getAuthenticatedUserRefetch();
    getPagesRefetch();
    getSettingsRefetch();
  }, [
    getAuthenticatedUserRefetch,
    getPagesRefetch,
    getSettingsRefetch,
    isAuthenticated,
  ]);

  if (
    getAuthenticatedUserLoading ||
    getAuthenticatedUserNetworkStatus === NetworkStatus.refetch ||
    getPagesLoading ||
    getPagesNetworkStatus === NetworkStatus.refetch ||
    getSettingsLoading ||
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

          <Section>
            <Callout />
          </Section>

          <Styled.Main>
            {Object.keys(pages).map(key => {
              const { component, exact, path, private: isPrivate } = pages[key];
              const Tag = isPrivate ? ProtectedRoute : Route;

              return (
                <Tag exact={exact} key={key} path={path}>
                  <Page>{component}</Page>
                </Tag>
              );
            })}
          </Styled.Main>

          <Styled.FloatingButtonPortal ref={portalNodes.floatingButton} />

          <Footer />
        </Styled.App>
      </Styled.Center>
    </>
  );
};
