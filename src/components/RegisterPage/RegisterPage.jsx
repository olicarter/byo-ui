import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { parse } from 'qs';

import { useAuth } from '../../contexts';
import * as Styled from './RegisterPage.styled';
import { Layout } from '../Layout';
import { Section } from '../Section';
import { RegisterForm } from '../RegisterForm';
import { SubTitle, Title } from '../Typography';

export const RegisterPage = () => {
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
  );
};
