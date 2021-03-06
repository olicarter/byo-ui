import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';

import { CallToActionButton } from '@components/CallToActionButton';
import { FormGroup } from '@components/FormGroup';
import { TextInput } from '@components/TextInput';

import { SEND_CONTACT_FORM } from './ContactForm.gql';

export const ContactForm = () => {
  const { errors, handleSubmit, register, reset } = useForm();

  const [recentlySubmitted, setRecentlySubmitted] = useState(false);

  const [sendContactForm] = useMutation(SEND_CONTACT_FORM, {
    onCompleted: () => {
      reset();
      setRecentlySubmitted(true);
      setTimeout(() => {
        setRecentlySubmitted(false);
      }, 3000);
    },
  });

  const onSubmit = ({ email, message, name, subject }) => {
    sendContactForm({ variables: { email, message, name, subject } });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup horizontal>
          <FormGroup
            label="Name"
            info="What can we call you?"
            errorInfo={errors.name && errors.name.message}
          >
            <TextInput
              name="name"
              ref={register({
                required: 'We need your name to send the message',
              })}
              type="text"
            />
          </FormGroup>

          <FormGroup
            label="Email"
            info="What email should we respond to?"
            errorInfo={errors.email && errors.email.message}
          >
            <TextInput
              name="email"
              ref={register({
                required: 'Please enter an email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email',
                },
              })}
              type="email"
            />
          </FormGroup>
        </FormGroup>

        <FormGroup
          label="Message"
          info="Ask or tell us anything you like here!"
          errorInfo={errors.message && errors.message.message}
        >
          <TextInput
            name="message"
            ref={register({ required: "There's no message to send!" })}
            type="text"
          />
        </FormGroup>

        <CallToActionButton
          backgroundColor={recentlySubmitted ? 'green' : 'primary'}
          disabled={recentlySubmitted}
          isSticky={false}
          onClick={handleSubmit(onSubmit)}
        >
          {recentlySubmitted ? 'Message sent' : 'Send message'}
        </CallToActionButton>
      </form>
    </>
  );
};
