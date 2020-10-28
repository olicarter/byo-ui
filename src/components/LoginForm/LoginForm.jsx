import React from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from '../../contexts';
import { FloatingButton } from '../FloatingButton';
import { FormGroup } from '../FormGroup';
import { TextInput } from '../TextInput';

export const LoginForm = () => {
  const { login } = useAuth();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = ({ email, password }) => login(email, password);

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
        <FloatingButton type="submit">Log in</FloatingButton>
      </FormGroup>
    </form>
  );
};
