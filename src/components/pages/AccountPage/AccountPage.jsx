import React from 'react';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';

import { useAuth } from '@contexts';
import { FloatingButton } from '@components/FloatingButton';
import { Layout } from '@components/Layout';
import { Markdown } from '@components/Markdown';
import { Section } from '@components/Section';
import { UserOrders } from '@components/UserOrders';

import { GET_ALL_SETTINGS } from './AccountPage.gql';

export const AccountPage = () => {
  const { logout } = useAuth();

  const {
    data: { allSettings: [{ accountHeader = '' } = {}] = [] } = {},
  } = useQuery(GET_ALL_SETTINGS);

  return (
    <>
      <Helmet>
        <title>BYO | Account</title>
      </Helmet>
      <Layout>
        <Section>
          <Markdown>{accountHeader}</Markdown>
        </Section>
        <Section>
          <UserOrders />
        </Section>
        <Section>
          <FloatingButton backgroundColor="red" onClick={() => logout('/')}>
            Log out
          </FloatingButton>
        </Section>
      </Layout>
    </>
  );
};
