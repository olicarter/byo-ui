import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { parse } from 'qs';

import { useAuth } from '../../contexts';
import { Layout } from '../Layout';
import { LoginForm } from '../LoginForm';
import { Markdown } from '../Markdown';
import { Section } from '../Section';

export const LoginPage = () => {
  const { push } = useHistory();
  const { search } = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const { from = '/' } = parse(search, { ignoreQueryPrefix: true });
      push(from);
    }
  }, [isAuthenticated]);

  return (
    <Layout>
      <Section>
        <Markdown># Login</Markdown>
      </Section>
      <Section>
        <LoginForm />
      </Section>
    </Layout>
  );
};
