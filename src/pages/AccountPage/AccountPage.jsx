import React from 'react';

import { useAuth } from '@contexts';
import { CallToActionButton } from '@components/CallToActionButton';
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
        <CallToActionButton backgroundColor="red" onClick={() => logout('/')}>
          Log out
        </CallToActionButton>
      </Section>
    </>
  );
};
