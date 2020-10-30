import React from 'react';
import { useQuery } from '@apollo/client';

import { useAuth } from '../../contexts';
import { GET_AUTHENTICATED_USER } from './AccountPage.gql';
import { FloatingButton } from '../FloatingButton';
import { Layout } from '../Layout';
import { Section } from '../Section';
import { Title } from '../Typography';
import { UserOrders } from '../UserOrders';

export const AccountPage = () => {
  const { logout } = useAuth();

  const { data: { authenticatedUser } = {} } = useQuery(GET_AUTHENTICATED_USER);

  const { name = '' } = authenticatedUser || {};

  return (
    <Layout>
      <Section>
        {name ? <Title>Hello, {name}</Title> : <Title>Account</Title>}
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
