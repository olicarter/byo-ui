import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import { useAuth } from '../../contexts';
import {
  CREATE_USER,
  GET_USERS_BY_EMAIL,
  GET_USERS_BY_NETLIFY_ID,
} from './LoginModal.gql';
import * as Styled from './LoginModal.styled';
import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { Label } from '../Label';
import { Modal } from '../Modal';
import { TextInput } from '../TextInput';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export const LoginModal = () => {
  const {
    errorMessages: { INVALID_EMAIL_OR_PASSWORD },
    closeLoginModal,
    login,
    signup,
  } = useAuth();

  const [buttonText, setButtonText] = useState('Continue');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [
    isInvalidEmailOrPasswordMessageVisible,
    setIsInvalidEmailOrPasswordMessageVisible,
  ] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(null);
  const [isPasswordInputVisible, setIsPasswordInputVisible] = useState(false);
  const [isFirstNameInputVisible, setIsFirstNameInputVisible] = useState(false);
  const [isLastNameInputVisible, setIsLastNameInputVisible] = useState(false);
  const [isContinueButtonDisabled, setIsContinueButtonDisabled] = useState(
    true,
  );

  const [getUsersByEmail] = useLazyQuery(GET_USERS_BY_EMAIL, {
    fetchPolicy: 'network-only',
    onCompleted: ({ allUsers }) => {
      setIsExistingUser(!!allUsers.length);
      setIsPasswordInputVisible(true);
    },
  });

  const [createUser] = useMutation(CREATE_USER, {
    update: (cache, { data: { createUser } }) => {
      cache.writeQuery({
        query: GET_USERS_BY_NETLIFY_ID,
        data: { allUsers: createUser },
      });
    },
  });

  useEffect(() => {
    setIsEmailValid(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setIsPasswordValid(password.length > 7);
  }, [password]);

  useEffect(() => {
    setIsFirstNameValid(firstName.length > 1);
  }, [firstName]);

  useEffect(() => {
    setIsLastNameValid(lastName.length > 1);
  }, [lastName]);

  useEffect(() => {
    setIsContinueButtonDisabled(
      !isEmailValid ||
        (isPasswordInputVisible && !isPasswordValid) ||
        (isFirstNameInputVisible && !isFirstNameValid) ||
        (isLastNameInputVisible && !isLastNameValid),
    );
  }, [
    isEmailValid,
    isPasswordInputVisible,
    isPasswordValid,
    isFirstNameInputVisible,
    isFirstNameValid,
    isLastNameInputVisible,
    isLastNameValid,
  ]);

  const handleContinue = async () => {
    try {
      if (isEmailValid && !isPasswordInputVisible) {
        return getUsersByEmail({ variables: { email } });
      }
      if (isEmailValid && isPasswordValid && isExistingUser) {
        setButtonText('Logging in...');
        setIsContinueButtonDisabled(true);
        const { error = {}, id } = await login(email, password);
        switch (error.message) {
          case INVALID_EMAIL_OR_PASSWORD:
            setIsInvalidEmailOrPasswordMessageVisible(true);
            setPassword('');
            setButtonText('Continue');
            setIsContinueButtonDisabled(true);
            break;
          // no default
        }
        if (id) return closeLoginModal();
      } else {
        if (isEmailValid && isPasswordValid && !isFirstNameInputVisible) {
          setIsFirstNameInputVisible(true);
        }
        if (
          isEmailValid &&
          isPasswordValid &&
          isFirstNameValid &&
          !isLastNameInputVisible
        ) {
          setIsLastNameInputVisible(true);
        }
        if (
          isEmailValid &&
          isPasswordValid &&
          isFirstNameValid &&
          isLastNameValid
        ) {
          setButtonText('Storing your details...');
          setIsContinueButtonDisabled(true);
          const signupRes = await signup(email, password);
          const { error: signupError = {}, id: netlifyId } = signupRes;
          /** @todo handle error better */
          if (signupError.message) return console.error(signupError.message);
          await createUser({
            variables: { email, firstName, lastName, netlifyId },
          });
          setButtonText('Logging in...');
          setIsContinueButtonDisabled(true);
          const { error: loginError = {}, id } = await login(email, password);
          switch (loginError.message) {
            case INVALID_EMAIL_OR_PASSWORD:
              setIsInvalidEmailOrPasswordMessageVisible(true);
              setPassword('');
              setButtonText('Continue');
              setIsContinueButtonDisabled(true);
              break;
            // no default
          }
          if (id) return closeLoginModal();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !isContinueButtonDisabled) {
      e.preventDefault();
      handleContinue();
    }
  };

  return (
    <Modal onClose={closeLoginModal}>
      <Styled.LoginForm onKeyDown={handleKeyDown}>
        <Styled.Heading>Log in</Styled.Heading>
        <Styled.Info>
          To place an order with us, we need you to provide some details for
          essential communication and delivery purposes.
        </Styled.Info>
        <FormGroup label="Enter your email">
          <TextInput autoFocus onChange={setEmail} type="email" />
        </FormGroup>

        {isPasswordInputVisible ? (
          <FormGroup
            label={
              isExistingUser
                ? 'Hello again,'
                : `Looks like you're new, enter ${
                    isExistingUser ? 'your' : 'a'
                  } password`
            }
            info={
              isExistingUser ||
              'Your password must be at least 8 characters long.'
            }
            errorInfo={
              isInvalidEmailOrPasswordMessageVisible &&
              'Incorrect password, please try again.'
            }
          >
            <TextInput
              autoFocus
              onChange={setPassword}
              type="password"
              value={password}
            />
          </FormGroup>
        ) : null}

        {isFirstNameInputVisible ? (
          <FormGroup label="What's your first name?">
            <TextInput autoFocus onChange={setFirstName} type="text" />
          </FormGroup>
        ) : null}

        {isLastNameInputVisible ? (
          <FormGroup
            label="...and your last name?"
            info="This is useful for more formal scenarios, like deliveries and receipts."
          >
            <TextInput autoFocus onChange={setLastName} type="text" />
          </FormGroup>
        ) : null}

        <FormGroup>
          <Button
            borderRadius
            disabled={isContinueButtonDisabled}
            onClick={handleContinue}
          >
            {buttonText}
          </Button>
        </FormGroup>
      </Styled.LoginForm>
    </Modal>
  );
};
