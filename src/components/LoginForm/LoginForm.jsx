import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { parse } from 'qs';

import { useAuth } from '../../contexts';
import { FloatingButton } from '../FloatingButton';
import { FormGroup } from '../FormGroup';
import { Label } from '../Label';
import { TextInput } from '../TextInput';

export const LoginForm = () => {
  const { search } = useLocation();
  const { useLogin } = useAuth();
  const { handleSubmit, register, setValue, errors } = useForm();

  const { email: queryEmail } = parse(search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    if (queryEmail) setValue('email', queryEmail);
  }, [queryEmail]);

  const [
    authenticateUser,
    { error: authenticateUserError, loading: authenticateUserLoading },
  ] = useLogin();

  const onSubmit = ({ email, password }) => {
    authenticateUser({ variables: { email, password } });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          label="Email"
          errorInfo={errors.email && errors.email.message}
        >
          <TextInput
            autoFocus={!queryEmail}
            name="email"
            ref={register({
              required: 'Please enter your email',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email',
              },
            })}
          />
        </FormGroup>

        <FormGroup
          label="Password"
          errorInfo={errors.password && errors.password.message}
        >
          <TextInput
            autoFocus={!!queryEmail}
            name="password"
            ref={register({
              required: 'Please enter your password',
              minLength: {
                value: 8,
                message: 'Your password must be at least 8 characters long',
              },
            })}
            type="password"
          />
        </FormGroup>
        <FloatingButton loading={authenticateUserLoading} type="submit">
          Log in
        </FloatingButton>
      </form>
      {authenticateUserError ? (
        <FormGroup>
          <Label color="red">
            There was an error logging in. This could be due to an incorrect
            email/password, or because you haven't registered with this email.
          </Label>
        </FormGroup>
      ) : null}
    </>
  );
};
