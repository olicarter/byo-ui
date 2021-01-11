import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { parse } from 'qs';

import { Section } from '@components/Section';
import { SubTitle } from '@components/Typography';
import { RequestPasswordResetForm, ResetPasswordForm } from '@forms';

import { COUNT_USERS_BY_EMAIL_AND_TOKEN } from './ResetPasswordPage.gql';

export const ResetPasswordPage = () => {
  const { search } = useLocation();

  const { email, sent, token } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const [
    getUserByEmailAndToken,
    { data: { _allUsersMeta: { count = 0 } = {} } = {} },
  ] = useLazyQuery(COUNT_USERS_BY_EMAIL_AND_TOKEN, {
    variables: { email, token },
  });

  useEffect(() => {
    if (email) getUserByEmailAndToken();
  }, [getUserByEmailAndToken, email]);

  return sent ? (
    <Section>
      <SubTitle>
        We have sent you a password reset email. Follow the link in the email to
        set a new password.
      </SubTitle>
    </Section>
  ) : (
    <>
      <Section>
        {Number(count) ? <ResetPasswordForm /> : <RequestPasswordResetForm />}
      </Section>
    </>
  );
};
