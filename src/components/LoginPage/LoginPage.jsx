import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { parse } from 'qs';

import { useAuth } from '../../contexts';
import * as Styled from './LoginPage.styled';
import { Layout } from '../Layout';
import { LoginForm } from '../LoginForm';
import { Section } from '../Section';
import { SubTitle, Title } from '../Typography';

export const LoginPage = () => {
  const { push } = useHistory();
  const { search } = useLocation();
  const { isAuthenticated } = useAuth();

  const { from = '/', new: newUser, name } = parse(search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    if (isAuthenticated) push(from);
  }, [isAuthenticated]);

  return (
    <Layout>
      <Section>
        {newUser ? (
          <>
            <Title>Welcome, {name}</Title>
            <SubTitle>You can now log in and start shopping</SubTitle>
          </>
        ) : (
          <>
            <Title>Login</Title>
            <SubTitle>
              New customer?{' '}
              <Styled.Link to={{ pathname: 'register', search }}>
                Register
              </Styled.Link>
            </SubTitle>
          </>
        )}
      </Section>
      <Section>
        <LoginForm />
      </Section>
    </Layout>
  );
};
