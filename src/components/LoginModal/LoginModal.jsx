import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import { useAuth } from '../../contexts';
import { CREATE_USER, GET_USERS_BY_EMAIL } from './LoginModal.gql';
import * as Styled from './LoginModal.styled';
import { Button } from '../Button';
import { FormGroup } from '../FormGroup';
import { Label } from '../Label';
import { Modal } from '../Modal';
import { TextInput } from '../TextInput';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
// const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const LoginModal = () => {
  const {
    errorMessages: { EMAIL_NOT_CONFIRMED, INVALID_EMAIL_OR_PASSWORD },
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
  const [
    isUnconfirmedEmailMessageVisible,
    setIsUnconfirmedEmailMessageVisible,
  ] = useState(false);
  const [continueButtonDisabled, setContinueButtonDisabled] = useState(true);

  const [getUsers] = useLazyQuery(GET_USERS_BY_EMAIL, {
    onCompleted: ({ allUsers }) => {
      setIsExistingUser(!!allUsers.length);
      setIsPasswordInputVisible(true);
    },
  });

  const [createUser] = useMutation(CREATE_USER, {
    // onCompleted: ({ allUsers }) => {
    //   setIsExistingUser(!!allUsers.length);
    //   setIsPasswordInputVisible(true);
    // },
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
    setContinueButtonDisabled(
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
        return getUsers({ variables: { email } });
      }
      if (isEmailValid && isPasswordValid && isExistingUser) {
        setButtonText('Logging in...');
        setContinueButtonDisabled(true);
        const { error = {}, id } = await login(email, password);
        switch (error.message) {
          case EMAIL_NOT_CONFIRMED: {
            setIsUnconfirmedEmailMessageVisible(true);
            setButtonText('Continue');
            setContinueButtonDisabled(false);
          }
          case INVALID_EMAIL_OR_PASSWORD: {
            setIsInvalidEmailOrPasswordMessageVisible(true);
            setPassword('');
            setButtonText('Continue');
            setContinueButtonDisabled(true);
          }
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
          const { id: netlifyId } = await signup(email, password);
          return createUser({
            variables: { email, firstName, lastName, netlifyId },
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !continueButtonDisabled) {
      e.preventDefault();
      handleContinue();
    }
  };

  return (
    <Modal onClose={closeLoginModal}>
      <Styled.LoginForm onKeyDown={handleKeyDown}>
        {isUnconfirmedEmailMessageVisible ? (
          <>
            <Styled.Heading>Email verification required</Styled.Heading>
            <Styled.Info>
              We recently sent you a verification email to ensure that the email
              you entered is your own. Just follow the link in that email to log
              in. If you can't find the email, use the button below to send
              another.
            </Styled.Info>
            <FormGroup>
              <Button
                borderRadius
                // onClick={handleContinue}
              >
                Send me a new verification email
              </Button>
            </FormGroup>
          </>
        ) : (
          <>
            <Styled.Heading>Log in</Styled.Heading>
            <Styled.Info>
              To place an order with us, we need you to provide some details for
              essential communication and delivery purposes.
            </Styled.Info>
            <FormGroup>
              <Label>Enter your email</Label>
              <TextInput autoFocus onChange={setEmail} type="email" />
            </FormGroup>

            {isPasswordInputVisible ? (
              <FormGroup>
                <Label>
                  {isExistingUser ? 'Hello again,' : "Looks like you're new,"}{' '}
                  enter {isExistingUser ? 'your' : 'a'} password
                </Label>
                {!isExistingUser ? (
                  <Styled.Info>
                    Your password must be at least 8 characters long.
                  </Styled.Info>
                ) : null}
                {isInvalidEmailOrPasswordMessageVisible ? (
                  <Styled.Info color="red">
                    Incorrect password, please try again.
                  </Styled.Info>
                ) : null}
                <TextInput
                  autoFocus
                  onChange={setPassword}
                  type="password"
                  value={password}
                />
              </FormGroup>
            ) : null}

            {isFirstNameInputVisible ? (
              <FormGroup>
                <Label>What's your first name?</Label>
                <TextInput autoFocus onChange={setFirstName} type="text" />
              </FormGroup>
            ) : null}

            {isLastNameInputVisible ? (
              <FormGroup>
                <Label>...and your last name?</Label>
                <Styled.Info>
                  This is useful for more formal scenarios, like deliveries and
                  receipts.
                </Styled.Info>
                <TextInput autoFocus onChange={setLastName} type="text" />
              </FormGroup>
            ) : null}

            <FormGroup>
              <Button
                borderRadius
                disabled={continueButtonDisabled}
                onClick={handleContinue}
              >
                {buttonText}
              </Button>
            </FormGroup>
          </>
        )}
      </Styled.LoginForm>
    </Modal>
  );
};
