import React from 'react';
import { useForm } from 'react-hook-form';

import { useAuth } from '@contexts';
import { FloatingButton } from '../FloatingButton';
import { FormGroup } from '../FormGroup';
import { Label } from '../Label';
import { PostcodeInput } from '../PostcodeInput';
import { TextInput } from '../TextInput';

export const RegisterForm = () => {
  const { useRegister } = useAuth();
  const { handleSubmit, register: registerInput, errors } = useForm({
    reValidateMode: 'onSubmit',
  });

  const [register, { error: registerError }] = useRegister();

  const onSubmit = ({ email, name, password, phone, postcode }) => {
    register({
      variables: {
        email,
        name,
        password,
        phone,
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          label="Postcode"
          info="Enter your postcode to check if we deliver to you"
          errorInfo={
            errors.postcode &&
            errors.postcode.type === 'validate' &&
            "Sorry, we don't deliver to you yet"
          }
        >
          <PostcodeInput register={registerInput} />
        </FormGroup>

        <FormGroup
          label="Email"
          info="Your email is required for placing and keeping track of orders"
          errorInfo={errors.email && errors.email.message}
        >
          <TextInput
            name="email"
            ref={registerInput({
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
          info="You'll need this for logging into your BYO account"
          errorInfo={errors.password && errors.password.message}
        >
          <TextInput
            name="password"
            ref={registerInput({
              required: 'Please enter your password',
              minLength: {
                value: 8,
                message: 'Your password must be at least 8 characters long',
              },
            })}
            type="password"
          />
        </FormGroup>

        <FormGroup
          label="Name"
          info="We need this for delivery and some personalisation when contacting you"
          errorInfo={errors.name && errors.name.message}
        >
          <TextInput
            name="name"
            ref={registerInput({
              required: 'Please enter your name',
              minLength: {
                value: 2,
                message: 'We need at least 2 characters',
              },
            })}
            type="text"
          />
        </FormGroup>

        <FormGroup
          label="Phone"
          info="We use this for essential delivery contact only"
          errorInfo={errors.phone && errors.phone.message}
        >
          <TextInput
            name="phone"
            ref={registerInput({
              required: 'Please provide a phone number',
              minLength: {
                value: 6,
                message: "Hmm that doesn't look like a valid phone number",
              },
            })}
            type="text"
          />
        </FormGroup>

        <FloatingButton type="submit">Register</FloatingButton>
      </form>
      {registerError ? (
        <FormGroup>
          <Label color="red">
            There was an error registering. Try using a different email or
            logging in instead.
          </Label>
        </FormGroup>
      ) : null}
    </>
  );
};
