import React from 'react';

import { useAuth } from '@contexts';
import { FloatingButton } from '@components/FloatingButton';
import { Section } from '@components/Section';
import { UserOrders } from '@components/UserOrders';

export const AccountPage = () => {
  const { logout } = useAuth();

  return (
    <>
      <Section>
        <UserOrders />
      </Section>

      <Section>
        <FloatingButton backgroundColor="red" onClick={() => logout('/')}>
          Log out
        </FloatingButton>
      </Section>
    </>
  );
};
