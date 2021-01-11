import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { parse } from 'qs';

import { useAuth } from '@contexts';
import { Section } from '@components/Section';
import { SubTitle } from '@components/Typography';
import { RegisterForm } from '@forms';

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
      <Section>
        <SubTitle>
          Existing customer?{' '}
          <Styled.Link to={{ pathname: 'login', search }}>Login</Styled.Link>
        </SubTitle>
      </Section>

      <Section>
        <RegisterForm />
      </Section>
    </>
  );
};
