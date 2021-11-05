/* eslint-disable */
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { Container } from '@mui/material';

// Self defined Components
import TextInput from './Components/TextInput';
import {
  StyledForm,
  WrappedContainer
} from './Components/Styles';
import PasswordInput from './Components/PasswordInput';
import { apiFetch, setFieldInState } from './Helpers';

export default function Register () {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [passwordField, setPasswordField] = React.useState({
    password: '',
    showPassword: false,
  });

  const [confirmPassword, setConfirmPassword] = React.useState({
    password: '',
    showPassword: false,
  });

  const [errorStatus, setErrorStatus] = React.useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [errorMsg, setErrorMsg] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const resetError = () => {
    setErrorStatus({
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
    setErrorMsg({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
  }

  const submitRegister = async (name, email, password, confirmPassword) => {
    // If passwords do not match
    if (password !== confirmPassword) {
      console.log('passwords not the same');
      setFieldInState('password', true, errorStatus, setErrorStatus);
      setFieldInState('confirmPassword', true, errorStatus, setErrorStatus);
      setFieldInState('password', 'Passwords do not match', errorMsg, setErrorMsg);
      setFieldInState('confirmPassword', 'Passwords do not match', errorMsg, setErrorMsg);
      setPasswordField({
        password: '',
        showPassword: false,
      });
      setConfirmPassword({
        password: '',
        showPassword: false,
      });
      console.log(errorStatus);
      console.log(errorMsg);
      return;
    } 

    // If fields are empty
    if (name == '' || email == '' || password == '' || confirmPassword == '') {
      setFieldInState('name', true, errorStatus, setErrorStatus);
      setFieldInState('email', true, errorStatus, setErrorStatus);
      setFieldInState('password', true, errorStatus, setErrorStatus);
      setFieldInState('confirmPassword', true, errorStatus, setErrorStatus);
      setFieldInState('name', 'Fill in required fields.', errorMsg, setErrorMsg);
      setFieldInState('email', 'Fill in required fields.', errorMsg, setErrorMsg);
      setFieldInState('password', 'Fill in required fields.', errorMsg, setErrorMsg);
      setFieldInState('confirmPassword', 'Fill in required fields.', errorMsg, setErrorMsg);
      return;
    }
    const body = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const ret = await apiFetch('POST', '/user/auth/register', null, body);
      console.log(ret);
      setToken(ret.token);
    } catch (e) {
      setErrorStatus({
        email: true,
        password: true,
      })
      setErrorMsg({
        email: e,
        password: e,
      })
      console.log(errorMsg);
    }
  }

  return (
    <Container sx= {{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }}>
        <WrappedContainer>
          <StyledForm>
            <h1>
              Welcome to AirBrb.
            </h1>
            <div>
              <TextInput
                errorStatus={errorStatus.name}
                errorMsg={errorMsg.name}
                resetError={resetError}
                label='Name'
                setState={setName}
              />
              <TextInput 
                errorStatus={errorStatus.email}
                errorMsg={errorMsg.email}
                resetError={resetError}
                label='Email'
                setState={setEmail}/>
              <PasswordInput
                errorStatus={errorStatus.password}
                errorMsg={errorMsg.password}
                resetError={resetError}
                label='Password'
                passwordField={passwordField}
                setState={setPasswordField}
              />
              <PasswordInput
                errorStatus={errorStatus.confirmPassword}
                errorMsg={errorMsg.confirmPassword}
                resetError={resetError}
                label='Confirm Password'
                passwordField={confirmPassword}
                setState={setConfirmPassword}/>
            </div>
            <br/>
            <Button variant="contained" onClick={(e) => submitRegister(name, email, passwordField.password, confirmPassword.password) }>Register</Button>
          </StyledForm>
          <Divider variant="middle"/>
          <StyledForm>
            <Link href='/login' underline="hover">
              Already have an Accout? Login here.
            </Link>
          </StyledForm>
        </WrappedContainer>
      </Box>
    </Container>
  );
}
