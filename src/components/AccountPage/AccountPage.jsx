import React from 'react';
import { useQuery } from '@apollo/client';

import { useAuth } from '../../contexts';
import { GET_ALL_SETTINGS } from './AccountPage.gql';
import { FloatingButton } from '../FloatingButton';
import { Layout } from '../Layout';
import { Markdown } from '../Markdown';
import { Section } from '../Section';
import { UserOrders } from '../UserOrders';

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
