import React from 'react';

import { useAuth } from '../../contexts';
import { FloatingButton } from '../FloatingButton';
import { Layout } from '../Layout';
import { Markdown } from '../Markdown';
import { Section } from '../Section';
import { UserOrders } from '../UserOrders';

export const AccountPage = () => {
  const { logout } = useAuth();

  return (
    <Layout>
      <Section>
        <Markdown># Account</Markdown>
      </Section>
      <Section>
        <UserOrders />
      </Section>
      <Section>
        <FloatingButton
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log out
        </FloatingButton>
      </Section>
    </Layout>
  );
};
