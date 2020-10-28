import React from 'react';

import { Layout } from '../Layout';
import { LoginForm } from '../LoginForm';
import { Markdown } from '../Markdown';
import { Section } from '../Section';

export const LoginPage = () => (
  <Layout>
    <Section>
      <Markdown># Login</Markdown>
    </Section>
    <Section>
      <LoginForm />
    </Section>
  </Layout>
);
