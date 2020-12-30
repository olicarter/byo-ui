import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { parse, stringify } from 'qs';

import { FloatingButton } from '@components/FloatingButton';
import { FormGroup } from '@components/FormGroup';
import { TextInput } from '@components/TextInput';

import { RESET_USER_PASSWORD } from './ResetPasswordForm.gql';

export const ResetPasswordForm = () => {
  const { push } = useHistory();
  const { search } = useLocation();

  const { email, token } = parse(search, {
    ignoreQueryPrefix: true,
  });

  const { handleSubmit, register, errors } = useForm();

  const [resetUserPassword] = useMutation(RESET_USER_PASSWORD, {
    onCompleted: () => push('/login'),
  });

  const onSubmit = ({ password }) => {
    resetUserPassword({ variables: { email, password, token } });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          label="Password"
          info="Enter a new password"
          errorInfo={errors.password && errors.password.message}
        >
          <TextInput
            autoFocus
            name="password"
            ref={register({
              required: 'You must enter a password',
            })}
            type="password"
          />
        </FormGroup>

        <FloatingButton type="submit">Update password</FloatingButton>
      </form>
    </>
  );
};
