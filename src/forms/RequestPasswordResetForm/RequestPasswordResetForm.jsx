import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { stringify } from 'qs';

import { FloatingButton } from '@components/FloatingButton';
import { FormGroup } from '@components/FormGroup';
import { TextInput } from '@components/TextInput';

import { SEND_PASSWORD_RESET_EMAIL } from './RequestPasswordResetForm.gql';

export const RequestPasswordResetForm = () => {
  const { push } = useHistory();
  const { handleSubmit, register, errors } = useForm();

  const [sendPasswordResetEmail] = useMutation(SEND_PASSWORD_RESET_EMAIL, {
    onCompleted: () => push({ search: stringify({ sent: true }) }),
  });

  const onSubmit = ({ email }) => {
    sendPasswordResetEmail({ variables: { email } });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          label="Email"
          info="Enter the email you'd like to reset the password for"
          errorInfo={errors.email && errors.email.message}
        >
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
            type="email"
          />
        </FormGroup>

        <FloatingButton type="submit">Reset password</FloatingButton>
      </form>
    </>
  );
};
