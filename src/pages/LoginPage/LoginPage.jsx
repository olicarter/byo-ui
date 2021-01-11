import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { stringify, parse } from 'qs';

import { useAuth } from '@contexts';
import { Section } from '@components/Section';
import { SubTitle } from '@components/Typography';
import { LoginForm } from '@forms';

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

  return (
    <>
      {newUser ? (
        <Section>
          <SubTitle>You can now log in and start shopping</SubTitle>
        </Section>
      ) : (
        <Section>
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

          <SubTitle>
            Forgotten your password?{' '}
            <Styled.Link color="red" to="reset-password">
              Reset your password
            </Styled.Link>
          </SubTitle>
        </Section>
      )}

      <Section>
        <LoginForm />
      </Section>
    </>
  );
};
