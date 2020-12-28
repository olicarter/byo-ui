import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { stringify, parse } from 'qs';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet';

import { useAuth } from '@contexts';
import { Layout } from '@components/Layout';
import { LoginForm } from '@components/LoginForm';
import { Markdown } from '@components/Markdown';
import { Section } from '@components/Section';
import { SubTitle, Title } from '@components/Typography';

import { GET_ALL_SETTINGS } from './LoginPage.gql';
import * as Styled from './LoginPage.styled';

export const LoginPage = () => {
  const { push } = useHistory();
  const { search } = useLocation();
  const { isAuthenticated } = useAuth();

  const { from = '/', new: newUser, name, ...restQuery } = parse(search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    if (isAuthenticated)
      push({
        pathname: from,
        search: stringify(restQuery, {
          arrayFormat: 'brackets',
          encode: false,
        }),
      });
  }, [from, isAuthenticated, push, restQuery]);

  const {
    data: { allSettings: [{ loginHeader = '' } = {}] = [] } = {},
  } = useQuery(GET_ALL_SETTINGS);

  console.log('restQuery', restQuery);

  return (
    <>
      <Helmet>
        <title>BYO | Log in</title>
      </Helmet>
      <Layout>
        {newUser ? (
          <Section>
            <Title>Welcome, {name}</Title>
            <SubTitle>You can now log in and start shopping</SubTitle>
          </Section>
        ) : (
          <Section>
            <Markdown>{loginHeader}</Markdown>
            <SubTitle>
              New customer?{' '}
              <Styled.Link
                to={{
                  pathname: 'register',
                  search: stringify(restQuery, {
                    arrayFormat: 'brackets',
                    encode: false,
                  }),
                }}
              >
                Register
              </Styled.Link>
            </SubTitle>
          </Section>
        )}

        <Section>
          <LoginForm />
        </Section>
      </Layout>
    </>
  );
};
