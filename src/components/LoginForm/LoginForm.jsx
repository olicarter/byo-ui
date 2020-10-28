import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../contexts';
import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { TextInput } from '../TextInput';

export const LoginForm = () => {
  const { state: { from: { pathname } = {} } = {} } = useLocation();
  const { login, loginWithRedirect } = useAuth();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = ({ email, password }) => login(email, password);

  useEffect(() => {
    loginWithRedirect({
      redirectUri: pathname
        ? `${window.location.origin}${pathname}`
        : window.location.origin,
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="Email" errorInfo={errors.email && errors.email.message}>
        <TextInput
          autoFocus
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

      <FormGroup>
        <Button borderRadius type="submit">
          Log in
        </Button>
      </FormGroup>
    </form>
  );
};
