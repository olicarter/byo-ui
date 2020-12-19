import React from 'react';
import { useQuery } from '@apollo/client';

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
    <Layout>
      <Section>
        <Markdown>{accountHeader}</Markdown>
      </Section>
      <Section>
        <UserOrders />
      </Section>
      <Section>
        <FloatingButton onClick={() => logout('/')}>Log out</FloatingButton>
      </Section>
    </Layout>
  );
};
