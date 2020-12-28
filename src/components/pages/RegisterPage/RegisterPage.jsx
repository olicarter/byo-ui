import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { parse } from 'qs';
import { Helmet } from 'react-helmet';

import { useAuth } from '@contexts';
import { Layout } from '@components/Layout';
import { Section } from '@components/Section';
import { RegisterForm } from '@components/RegisterForm';
import { SubTitle, Title } from '@components/Typography';

import * as Styled from './RegisterPage.styled';

export const RegisterPage = () => {
  const { push } = useHistory();
  const { search } = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      const { from = '/' } = parse(search, { ignoreQueryPrefix: true });
      push(from);
    }
  }, [isAuthenticated, push, search]);

  return (
    <>
      <Helmet>
        <title>BYO | Register</title>
      </Helmet>
      <Layout>
        <Section>
          <Title>Register</Title>
          <SubTitle>
            Existing customer?{' '}
            <Styled.Link to={{ pathname: 'login', search }}>Login</Styled.Link>
          </SubTitle>
        </Section>
        <Section>
          <RegisterForm />
        </Section>
      </Layout>
    </>
  );
};
